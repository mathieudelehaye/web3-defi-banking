import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor DBank {
  stable var currentValue: Float = 300;
  stable var startTime = Time.now();
  
  // Uncomment to reset current value and time
  // reset();
  Debug.print(debug_show(currentValue));
  Debug.print(debug_show(startTime));

  func reset() {
    currentValue := 300;  
    startTime := Time.now();
  };

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };
  
  public func withdraw(amount: Float) {
    let compValue: Float = currentValue - amount;
    if (compValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
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
    let timeElasped10S = timeElapsedNS / 10000000000;
    Debug.print(debug_show(timeElasped10S));
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElasped10S));
    
    startTime := currentTime;

    // Reset if current value > threshold
    if (currentValue > 10000) {
      Debug.print("Reset current value.");
      reset()
    }
  };
}