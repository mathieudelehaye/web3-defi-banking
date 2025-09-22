import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor DBank {
  stable var currentValue: Float = 300;
  // currentValue := 300;  // uncomment and deploy to reset stable variables 

  stable var startTime = Time.now();
  // startTime := Time.now();  // uncomment and deploy to reset stable variables 

  Debug.print(debug_show(startTime));

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
    let timeElaspedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElaspedS));
    startTime := currentTime;
  };
}