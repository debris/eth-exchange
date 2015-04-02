import "owned";

contract killswitch is owned {
  event NomineesChanged(address keyholder, address executive);
  event BoxOpened();
  event BoxClosed();

  function nominate(address _keyholder, address _executive) onlyowner {
	keyholder = _keyholder;
	executive = _executive;
	NomineesChanged(keyholder, executive);
  }
	
  function open() {
	if (msg.sender == owner || msg.sender == keyholder) {
	  isOpen = true;
	  BoxOpened();
	}
  }
  function close() {
	if (msg.sender == owner || msg.sender == keyholder) {
	  isOpen = false;
	  BoxClosed();
	}
  }
  modifier restricted {
	if (msg.sender == owner || (isOpen && msg.sender == executive)) {
	  _
	}
  }
							
  bool isOpen;
  address keyholder;
  address executive;
}
	
contract ClientReceipt is owned, killswitch {
  event AnonymousDeposit(address indexed _from, uint _value);
  event Deposit(address indexed _from, bytes32 _id, uint _value);
  event Refill(address indexed _from, uint _value);
  event Transfer(address indexed _from, address indexed _to, uint _value);
  event Test(bool indexed odd, int value);
	
  function() {
	AnonymousDeposit(msg.sender, msg.value);
  }
  function deposit(bytes32 _id) {
	Deposit(msg.sender, _id, msg.value);
  }
  function refill() {
	Refill(msg.sender, msg.value);
  }
  function transfer(address _to, uint _value) restricted {
	Transfer(msg.sender, _to, _value);
	_to.call.value(_value)();
  }
}
