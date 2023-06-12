// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint) public balances;

    event depositEvent(uint _amount, address _depositor);
    event withdrawEvent(uint _amount, address _depositor, address _beneficiary);
    /*
        입금 기능(deposit function)

        입금 기능은 payble으로 선언되어 코인을 받을 수 있습니다. 
        balances[msg.sender] += msg.value; 
        함수를 호출한 사람(msg.sender)의 보낸 돈을 balances에 할당합니다. 
        마지막으로 상태 변경 후 예금 이벤트를 내보냅니다.
    */
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit depositEvent(msg.value, msg.sender);
    }
    /*
        인출 기능(withdraw function)

        여기에는 돈을 받을 주소와 양도할 금액의 두 가지 매개변수가 필요합니다. 
        여기에는 아래 내용을 확인하는 두 가지require문이 있습니다.
        1. 주소 0으로 보내지 않음
        2. 금액이 사용자의 사용 가능한 잔액보다 클 때 자금을 보내지 않음
        이 함수는 돈을 보내는 사람의 잔액을 줄이고 돈을 받는 사람의 잔액을 늘리는 것입니다. 
        마지막으로 이러한 상태 변경 후에 이벤트가 발생합니다.
    */
    function withdraw(address _recipient, uint _amount) public {
        require(_recipient != address(0) ,"Bank: Cannot Send to Address Zero");
        require(_amount <= balances[msg.sender], "Bank: Insufficient Balance");

        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;

        emit withdrawEvent(_amount, msg.sender, _recipient);
    }
    /*
        getBalance 함수

        msg.sender의 잔액을 반환하는 함수입니다
     */
    

    function getBalance(address _addr) public view returns(uint) {
        return balances[_addr];
    }

}