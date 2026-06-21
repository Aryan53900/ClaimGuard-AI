from pydantic import BaseModel

class FraudRequest(BaseModel):
    months_as_customer: int
    age: int
    policy_deductable: int
    policy_annual_premium: float
    umbrella_limit: int
    insured_zip: int
    capital_gains: int
    capital_loss: int
    incident_hour_of_the_day: int
    number_of_vehicles_involved: int
    bodily_injuries: int
    witnesses: int
    total_claim_amount: float
    injury_claim: float
    property_claim: float
    vehicle_claim: float
    auto_year: int
    customer_tenure_days: int
    claim_to_premium_ratio: float