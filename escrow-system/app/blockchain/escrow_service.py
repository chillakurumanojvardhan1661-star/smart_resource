import json
from .web3_client import w3, get_account
from ..config import settings

# Placeholder ABI
ABI = [
    {"inputs":[],"name":"releaseFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"raiseDispute","outputs":[],"stateMutability":"nonpayable","type":"function"}
]

def get_contract():
    if settings.SIMULATOR_MODE:
        class MockContract:
            class Functions:
                def releaseFunds(self):
                    class Func:
                        def build_transaction(self, tx): return {}
                    return Func()
                def raiseDispute(self):
                    class Func:
                        def build_transaction(self, tx): return {}
                    return Func()
            functions = Functions()
        return MockContract()
        
    return w3.eth.contract(
        address=settings.CONTRACT_ADDRESS,
        abi=ABI
    )

def release_funds_tx():
    contract = get_contract()
    account = get_account()

    if settings.SIMULATOR_MODE:
        return "0xSimulatorTxHash_Release"

    tx = contract.functions.releaseFunds().build_transaction({
        'from': account.address,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 2000000,
        'gasPrice': w3.to_wei('50', 'gwei')
    })

    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return tx_hash.hex()

def raise_dispute_tx():
    contract = get_contract()
    account = get_account()

    if settings.SIMULATOR_MODE:
        return "0xSimulatorTxHash_Dispute"

    tx = contract.functions.raiseDispute().build_transaction({
        'from': account.address,
        'nonce': w3.eth.get_transaction_count(account.address),
        'gas': 2000000,
        'gasPrice': w3.to_wei('50', 'gwei')
    })

    signed_tx = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return tx_hash.hex()
