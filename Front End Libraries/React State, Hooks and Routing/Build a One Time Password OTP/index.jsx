const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  //showTimer controls show otp, disable btn, show msgs
  const [showTimer, setShowTimer] = useState(false);
  const [count, setCount] = useState(0);
  // otpRef calls getOtp and sets the first msg to blank
  const otpRef = useRef(null);

  // changes msg and hides otp
  useEffect(() => {
    const countDown = setTimeout(() => {
      if (count === 0) {
        setShowTimer(false);
        return;
      }
      setCount(count - 1);
    }, 1000);
    return () => clearTimeout(countDown);
  }, [count]);

  //create opt
  const getOtp = () => {
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  };

  const handleClick = () => {
    setCount(5);
    setShowTimer(true);
    otpRef.current = getOtp();
  };

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <hr />
      <h2 id="otp-display" className={showTimer ? 'otp' : ''}>
        {showTimer ? otpRef.current : "Click 'Generate OTP' to get a code"}
      </h2>

      {otpRef.current === null ? (
        ""
      ) : (
        <p id="otp-timer">
          {showTimer
            ? `Expires in: ${count} seconds`
            : "OTP expired. Click the button to generate a new OTP."}
        </p>
      )}

      <button
        className={showTimer ? 'not-allowed' : ''}
        id="generate-otp-button"
        type="button"
        onClick={handleClick}
        disabled={showTimer}>
        Generate OTP 
      </button>
    </div>
  );
};
