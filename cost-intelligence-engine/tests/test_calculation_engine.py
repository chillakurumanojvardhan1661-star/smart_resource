import pytest
from app.models.schemas import CostCalculationRequest
from app.services.calculation_engine import (
    CostCalculationEngine,
    BaseShippingPlugin,
    DutyCalculationPlugin,
    TaxCalculationPlugin,
    HandlingCalculationPlugin
)

@pytest.fixture
def engine():
    eng = CostCalculationEngine()
    eng.register_plugin(BaseShippingPlugin())
    eng.register_plugin(DutyCalculationPlugin())
    eng.register_plugin(TaxCalculationPlugin())
    eng.register_plugin(HandlingCalculationPlugin())
    return eng

def test_calculation_engine_air_shipping(engine):
    req = CostCalculationRequest(
        product_price=100.0,
        quantity=50,
        origin_country="China",
        destination_country="India",
        weight=20.0,
        shipping_mode="air",
        selling_price=150.0
    )
    context = {
        "request": req,
        "duty_rate": 0.15,
        "tax_rate": 0.18,
        "costs": {"shipping": 0.0, "duty": 0.0, "tax": 0.0, "handling": 0.0}
    }
    
    response = engine.calculate(context)
    
    # 20 kg * 80 (air) = 1600
    assert response.cost_breakdown.shipping == 1600.0
    # 5000 * 0.15 = 750
    assert response.cost_breakdown.duty == 750.0
    # (5000 + 1600 + 750) * 0.18 = 7350 * 0.18 = 1323.0
    assert response.cost_breakdown.tax == 1323.0
    # 5000 * 0.02 = 100
    assert response.cost_breakdown.handling == 100.0
    
    # 5000 + 1600 + 750 + 1323 + 100 = 8773.0
    assert response.total_landed_cost == 8773.0
    
    # Cost per unit = 8773.0 / 50 = 175.46
    assert response.cost_per_unit == 175.46

def test_calculation_engine_zero_quantity(engine):
    with pytest.raises(ValueError):
        CostCalculationRequest(
            product_price=100.0,
            quantity=0, # invalid
            origin_country="China",
            destination_country="India",
            weight=20.0,
            shipping_mode="air"
        )
