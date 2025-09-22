import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor DBank {
  stable var currentValue: Float = 300;
  stable var startTime = Time.now();
  
  // Uncomment to reset current value and time
  // reset();
  Debug.print("Account value: " # debug_show(currentValue));
  Debug.print("Start time: " # debug_show(startTime));

  func reset() {
    currentValue := 300;  
    startTime := Time.now();
  };

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print("Account value after topping up: " # debug_show(currentValue));
  };
  
  public func withdraw(amount: Float) {
    let compValue: Float = currentValue - amount;
    if (compValue >= 0) {
      currentValue -= amount;
      Debug.print("Account value after withdrawing: " # debug_show(currentValue));
    } else {
      Debug.print("Error: amount too large, current value less than zero.");
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    
    // Interest rate compounded every 10 second
    let interestPeriodS = 10;
    let timeElaspedS = timeElapsedNS / 1000000000 / interestPeriodS;
    Debug.print("Time elapsed since last compounding [sec]: " # debug_show(timeElaspedS*interestPeriodS));
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElaspedS));
    
    startTime := currentTime;

    // Reset if current value > threshold
    if (currentValue > 10000) {
      Debug.print("Reset current value.");
      reset()
    }
  };
}