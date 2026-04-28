from app.models.schemas import CostCalculationRequest, CostCalculationResponse
from app.services.calculation_engine import (
    CostCalculationEngine,
    BaseShippingPlugin,
    DutyCalculationPlugin,
    TaxCalculationPlugin,
    HandlingCalculationPlugin
)
from app.services.data_providers.country_data import JSONCountryDataProvider

class CostIntelligenceService:
    def __init__(self):
        # Initialize data providers
        self.country_data_provider = JSONCountryDataProvider()
        
        # Initialize and configure calculation engine with plugins
        self.engine = CostCalculationEngine()
        self.engine.register_plugin(BaseShippingPlugin())
        self.engine.register_plugin(DutyCalculationPlugin())
        self.engine.register_plugin(TaxCalculationPlugin())
        self.engine.register_plugin(HandlingCalculationPlugin())

    def calculate_cost(self, request: CostCalculationRequest) -> CostCalculationResponse:
        # Fetch external data
        duty_rate = self.country_data_provider.get_duty_rate(
            origin=request.origin_country,
            destination=request.destination_country
        )
        tax_rate = self.country_data_provider.get_tax_rate(
            country=request.destination_country
        )
        
        # Prepare context for the engine
        context = {
            "request": request,
            "duty_rate": duty_rate,
            "tax_rate": tax_rate,
            "costs": {
                "shipping": 0.0,
                "duty": 0.0,
                "tax": 0.0,
                "handling": 0.0
            }
        }
        
        # Execute the calculation engine pipeline
        response = self.engine.calculate(context)
        
        return response
