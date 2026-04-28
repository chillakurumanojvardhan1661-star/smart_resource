from typing import Dict, List, Any
from abc import ABC, abstractmethod
from app.core.config import settings
from app.models.schemas import CostBreakdown, CostCalculationResponse

class CalculationPlugin(ABC):
    """Base class for all calculation engine plugins."""
    @abstractmethod
    def apply(self, context: Dict[str, Any]) -> None:
        """
        Modifies the context in-place.
        Context will contain intermediate costs and input parameters.
        """
        pass

class BaseShippingPlugin(CalculationPlugin):
    """Calculates shipping cost based on weight and mode."""
    def apply(self, context: Dict[str, Any]) -> None:
        req = context["request"]
        mode = req.shipping_mode.lower()
        weight = req.weight
        
        rates = {
            "air": settings.AIR_FREIGHT_RATE_PER_KG,
            "sea": settings.SEA_FREIGHT_RATE_PER_KG,
            "land": settings.LAND_FREIGHT_RATE_PER_KG
        }
        
        rate = rates.get(mode, 0.0)
        shipping_cost = weight * rate
        context["costs"]["shipping"] += shipping_cost

class DutyCalculationPlugin(CalculationPlugin):
    """Calculates duty based on origin, destination and product cost."""
    def apply(self, context: Dict[str, Any]) -> None:
        req = context["request"]
        product_value = req.product_price * req.quantity
        duty_rate = context.get("duty_rate", settings.DEFAULT_DUTY_RATE)
        
        duty_cost = product_value * duty_rate
        context["costs"]["duty"] += duty_cost

class TaxCalculationPlugin(CalculationPlugin):
    """Calculates tax (e.g. GST/VAT) based on product cost, shipping and duty."""
    def apply(self, context: Dict[str, Any]) -> None:
        req = context["request"]
        tax_rate = context.get("tax_rate", settings.DEFAULT_TAX_RATE)
        
        # Typically, VAT/GST is applied on the sum of product value, shipping, and duty
        product_value = req.product_price * req.quantity
        taxable_value = product_value + context["costs"]["shipping"] + context["costs"]["duty"]
        
        tax_cost = taxable_value * tax_rate
        context["costs"]["tax"] += tax_cost

class HandlingCalculationPlugin(CalculationPlugin):
    """Calculates handling charges as a percentage of product cost."""
    def apply(self, context: Dict[str, Any]) -> None:
        req = context["request"]
        product_value = req.product_price * req.quantity
        handling_cost = product_value * settings.HANDLING_CHARGE_PERCENTAGE
        context["costs"]["handling"] += handling_cost


class CostCalculationEngine:
    """
    Engine that orchestrates various calculation plugins.
    Allows for future extensions (e.g., RiskPlugin, SustainabilityPlugin).
    """
    def __init__(self):
        self.plugins: List[CalculationPlugin] = []

    def register_plugin(self, plugin: CalculationPlugin):
        self.plugins.append(plugin)

    def calculate(self, context: Dict[str, Any]) -> CostCalculationResponse:
        """
        Runs all registered plugins on the context and computes final totals.
        """
        for plugin in self.plugins:
            plugin.apply(context)
            
        req = context["request"]
        costs = context["costs"]
        
        product_value = req.product_price * req.quantity
        total_landed_cost = product_value + sum(costs.values())
        cost_per_unit = total_landed_cost / req.quantity
        
        profit_margin = None
        if req.selling_price is not None:
            total_revenue = req.selling_price * req.quantity
            profit = total_revenue - total_landed_cost
            profit_margin = (profit / total_revenue) * 100 if total_revenue > 0 else 0.0
            
        breakdown = CostBreakdown(
            shipping=costs.get("shipping", 0.0),
            duty=costs.get("duty", 0.0),
            tax=costs.get("tax", 0.0),
            handling=costs.get("handling", 0.0)
        )
        
        return CostCalculationResponse(
            total_landed_cost=round(total_landed_cost, 2),
            cost_per_unit=round(cost_per_unit, 2),
            profit_margin=round(profit_margin, 2) if profit_margin is not None else None,
            cost_breakdown=breakdown
        )
