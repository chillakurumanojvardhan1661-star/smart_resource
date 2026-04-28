from web3 import Web3
from ..config import settings
import logging

logger = logging.getLogger(__name__)

class Web3Simulator:
    def __init__(self):
        self.eth = self.EthSimulator()
        
    class EthSimulator:
        def get_transaction_count(self, address): return 0
        def send_raw_transaction(self, raw): return b'\x00' * 32
        
    def to_wei(self, val, unit): return 1000000000
    
    class AccountSimulator:
        def from_key(self, key):
            class Acc:
                address = "0xSimulatorAddress"
                def sign_transaction(self, tx):
                    class Signed:
                        rawTransaction = b'\x00' * 32
                    return Signed()
            return Acc()

if settings.SIMULATOR_MODE:
    logger.info("Starting Web3 in SIMULATOR mode")
    w3 = Web3Simulator()
    # Mocking Account
    class MockEthAccount:
        def from_key(self, key):
            class Acc:
                address = "0xSimulatorAddress"
                def sign_transaction(self, tx):
                    class Signed:
                        rawTransaction = b'\x00' * 32
                    return Signed()
            return Acc()
    w3.eth.account = MockEthAccount()
else:
    try:
        w3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER))
    except Exception as e:
        logger.error(f"Failed to connect to Web3: {e}. Falling back to simulator.")
        w3 = Web3Simulator()

def get_account():
    if settings.SIMULATOR_MODE:
        return w3.eth.account.from_key(settings.PRIVATE_KEY)
    return w3.eth.account.from_key(settings.PRIVATE_KEY)
