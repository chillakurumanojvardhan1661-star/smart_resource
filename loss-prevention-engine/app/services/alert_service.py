from ..alerts.evaluator import evaluate_decision
from ..database import SessionLocal
from ..models.alert import Alert

def process_decision_check(data):
    result = evaluate_decision(data)
    
    # Save alerts to database for auditing
    db = SessionLocal()
    try:
        for a in result["alerts"]:
            alert_entry = Alert(
                message=a["message"],
                severity=a["severity"],
                category=a["category"]
            )
            db.add(alert_entry)
        db.commit()
    finally:
        db.close()
        
    return result
