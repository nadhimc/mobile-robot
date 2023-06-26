"use-client";
import RealtimeChart from "@/components/RealtimeChart";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

Chart.register(
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

const socket = io("http://192.168.18.57:3008"); // e.g. "http://192.168.1.100:3000"

const SocketInput = ({ title, socketEvent, step }) => {
  const [value, setValue] = useState(0);

  function onChange(event) {
    let newValue = parseFloat(event.target.value) || 0;
    socket.emit(socketEvent, newValue);
    setValue(newValue);
  }

  return (
    <div>
      <h1>{title}</h1>
      <input type="number" value={value} step={step || 1} onChange={onChange} />
    </div>
  );
};

export default function Home() {
  const [rightpwm, setRightpwm] = useState(0);
  const [leftpwm, setLeftpwm] = useState(0);
  const [leftSpeed, setLeftSpeed] = useState(0);
  const [rightSpeed, setRightSpeed] = useState(0);
  const [correctionSpeed, setCorrectionSpeed] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [dataLeft, setDataLeft] = useState([]);
  const [leftKp, setLeftKp] = useState(0);
  const [leftKi, setLeftKi] = useState(0);
  const [leftKd, setLeftKd] = useState(0);
  const [rightKp, setRightKp] = useState(0);
  const [rightKi, setRightKi] = useState(0);
  const [rightKd, setRightKd] = useState(0);
  const [data, setData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [dumping, setDumping] = useState(0);
  const [note, setNote] = useState("Belum terkoneksi");
  const [state, setState] = useState(0);
  const [dumpingState, setDumpingState] = useState(false);
  const [count, setCount] = useState(0);
  const [stopInterrupt, setStopInterrupt] = useState(0);
  const [dumpingTime, setDumpingTime] = useState(0);
  const [dumpCount, setDumpCount] = useState(0);
  const [rfidResetState, setRfidResetState] = useState(0);
  const [kcptnKanan, setKcptnKanan] = useState(3);
  const [kcptnKiri, setKcptnKiri] = useState(3);
  const [sensorData, setSensorData] = useState();
  const [leftDesiredSpeedData, setLeftDesiredSpeedData] = useState([]);
  const [rightDesiredSpeedData, setRightDesiredSpeedData] = useState([]);
  const [lineFollowerErrorData, setLineFollowerErrorData] = useState([]);
  const [mpuData, setMpuData] = useState([]);
  const [grafikOn, setGrafikOn] = useState(false);
  const [changeStateVar, setChangeStateVar] = useState(0);

  useEffect(() => {
    const rightPwmSet = (value) => {
      setRightpwm(value);
    };
    socket.on("rightpwm", rightPwmSet);

    const leftPwmSet = (value) => {
      setLeftpwm(value);
    };

    socket.on("leftpwm", leftPwmSet);

    const destinationSet = (value) => {
      // alert(`dapat destinasi ${value}`);
    };

    socket.on("destination", destinationSet);

    // socket.on("robotevent", (value) => {
    //   const newDataPoint = {
    //     x: new Date(),
    //     y: value.kecepatanLeft, // Ubah dengan logika pembaruan data Anda
    //   };
    //   const newRightDataPoint = {
    //     x: new Date(),
    //     y: value.kecepatanRight, // Ubah dengan logika pembaruan data Anda
    //   };
    //   setData((prevData) => {
    //     if (prevData.length >= 201) {
    //       prevData.shift();
    //     }
    //     return [...prevData, newDataPoint];
    //   });
    //   setRightData((prevData) => {
    //     if (prevData.length >= 201) {
    //       prevData.shift();
    //     }
    //     return [...prevData, newRightDataPoint];
    //   });
    // });
    return () => {
      socket.off("rightpwm", rightPwmSet);
      socket.off("leftpwm", leftPwmSet);
      socket.off("destination", destinationSet);
    };
  }, []);

  useEffect(() => {
    const robotEventListener = (value) => {
      setSensorData(value);
      const newDataPoint = {
        x: new Date(),
        y: value.kecepatanLeft, // Ubah dengan logika pembaruan data Anda
      };
      const newRightDataPoint = {
        x: new Date(),
        y: value.kecepatanRight, // Ubah dengan logika pembaruan data Anda
      };
      const newLeftDesiredSpeedDataPoint = {
        x: new Date(),
        y: value.leftdesiredspeed, // Ubah dengan logika pembaruan data Anda
      };
      const newRightDesiredSpeedDataPoint = {
        x: new Date(),
        y: value.rightdesiredspeed, // Ubah dengan logika pembaruan data Anda
      };
      const newLineFollowerErrorDataPoint = {
        x: new Date(),
        y: value.lfkiri === 0 ? 10 : value.lfkanan === 0 ? 0 : 5, // Ubah dengan logika pembaruan data Anda
      };
      const newMpuDataPoint = {
        x: new Date(),
        y: value.mpu, // Ubah dengan logika pembaruan data Anda
      };
      setData((prevData) => {
        if (prevData.length >= 201) {
          prevData.shift();
        }
        return [...prevData, newDataPoint];
      });
      setRightData((prevData) => {
        if (prevData.length >= 201) {
          prevData.shift();
        }
        return [...prevData, newRightDataPoint];
      });
      setLeftDesiredSpeedData((prevData) => {
        if (prevData.length >= 201) {
          prevData.shift();
        }
        return [...prevData, newLeftDesiredSpeedDataPoint];
      });
      setRightDesiredSpeedData((prevData) => {
        if (prevData.length >= 201) {
          prevData.shift();
        }
        return [...prevData, newRightDesiredSpeedDataPoint];
      });
      setLineFollowerErrorData((prevData) => {
        if (prevData.length >= 201) {
          prevData.shift();
        }
        return [...prevData, newLineFollowerErrorDataPoint];
      });
      setMpuData((prevData) => {
        if (prevData.length >= 201) {
          prevData.shift();
        }
        return [...prevData, newMpuDataPoint];
      });
      const kcptnLmbt = 2;
      const kcptn = 3;
      const kcptnKiriCpt = 3;
      const kcptnKananCpt = 3;
      let {
        kecepatanLeft,
        kecepatanRight,
        rfid,
        mpu,
        lineFollower,
        distanceSensor,
        keberadaanPaket,
        destinasi,
        rfidReset,
        lfkiri,
        lfkanan,
      } = value;
      setCount((p) => (p + 1) % 100);
      setRfidResetState(rfidReset);

      if (distanceSensor < 30) {
        setChangeStateVar(2);
        setStopInterrupt(1);
        setNote("BERHENTI");
      } else {
        setStopInterrupt(0);
        if (changeStateVar === 2) {
          setChangeStateVar(0);
        }
        if (destinasi === "" && keberadaanPaket === 1) {
          if (changeStateVar === 1) {
            setChangeStateVar(0);
          }
          setState(0);
          setNote("destinasi kosong, tidak ada keberadaan paket");
        }
        if (destinasi !== "" && keberadaanPaket === 1 && state === 0) {
          setChangeStateVar(0);
          setState(1);
          setNote("destinasi ada, tidak ada keberadaan paket");
        }
        if (keberadaanPaket === 0 && state === 1) {
          setChangeStateVar(0);
          setState(2);
          setNote("destinasi ada, keberadaan paket ada");
        }
        if (destinasi === rfid && state === 2) {
          setChangeStateVar(0);
          setState(3);
          setNote("Ketemu keranjangnya");
        }
        if (keberadaanPaket === 1 && state === 3 && !dumpingState) {
          setChangeStateVar(0);
          setState(4);
          setNote("Selesai Dumping");
        }
        if (rfid === "63 C7 32 E7" && state === 4) {
          setChangeStateVar(0);
          setState(0);
          socket.emit("destination", "");
          setNote("kembali ke awal");
        }
      }
    };

    socket.on("robotevent", robotEventListener);
    return () => {
      socket.off("robotevent", robotEventListener);
    };
  }, [state, dumpingState, changeStateVar]);

  useEffect(() => {
    let speedSystem = 3;
    if (stopInterrupt === 1) {
      socket.emit("speed", 0);
    } else {
      if (state === 0 || state === 1) {
        if (rfidResetState === 0) {
          socket.emit("rfidreset", 1);
        }
        if (changeStateVar === 0) {
          socket.emit("speed", 0);
          socket.emit("dump", 2);
          setDumpingTime(0);
          setDumpingState(false);
          setChangeStateVar(state === 0 ? 3 : 1);
        }
      }
      if (state === 2) {
        if (changeStateVar === 0) {
          socket.emit("speed", speedSystem);
          setChangeStateVar(1);
        }
        // socket.emit("rightspeed", 3);
        // socket.emit("leftspeed", 3);
      }
      if (state === 3) {
        socket.emit("speed", 0);
        socket.emit("dump", 1);
        if (dumpingTime === 0) {
          let jam = new Date();
          setDumpingTime(jam.getTime());
          setDumpingState(true);
        } else {
          let now = new Date();
          if (now.getTime() - dumpingTime >= 10 * 1000) {
            setDumpingState(false);
          }
        }

        // Membersihkan timer saat komponen unmount atau state berubah
      }
      if (state === 4) {
        if (changeStateVar === 0) {
          socket.emit("speed", speedSystem);
          // socket.emit("rightspeed", kcptnKanan);
          // socket.emit("leftspeed", kcptnKiri);
          socket.emit("dump", 0);
          setChangeStateVar(1);
          if (rfidResetState === 2) {
            socket.emit("rfidreset", 0);
          }
        }
        if (rfidResetState === 0) {
          socket.emit("rfidreset", 1);
        }
        setDumpingState(false);
      }
    }
  }, [
    state,
    count,
    stopInterrupt,
    dumpingTime,
    rfidResetState,
    kcptnKanan,
    kcptnKiri,
  ]);

  useEffect(() => {
    setDataLeft((prevDataLeft) => {
      if (prevDataLeft.find((i) => i.pwm === leftpwm)) {
        return prevDataLeft.map((i) => {
          if (i.pwm === leftpwm) {
            return {
              pwm: leftpwm,
              kecepatanLeft: sensorData?.kecepatanLeft || 0,
              kecepatanRight: sensorData?.kecepatanRight || 0,
            };
          } else {
            return i;
          }
        });
      } else {
        return [
          ...prevDataLeft,
          {
            pwm: leftpwm,
            kecepatanLeft: sensorData?.kecepatanLeft || 0,
            kecepatanRight: sensorData?.kecepatanRight || 0,
          },
        ];
      }
    });
  }, [leftpwm, sensorData]);

  const speedChange = (event) => {
    let value = parseInt(event.target.value);
    socket.emit("speed", value);
    // socket.emit("leftspeed", value);
    setSpeed(value);
  };

  const leftSpeedChange = (event) => {
    let value = parseInt(event.target.value);
    socket.emit("leftspeed", value);
    // socket.emit("leftleftSpeed", value);
    setLeftSpeed(value);
  };

  const rightSpeedChange = (event) => {
    let value = parseInt(event.target.value);
    socket.emit("rightspeed", value);
    // socket.emit("rightrightSpeed", value);
    setRightSpeed(value);
  };

  const leftKpChange = (event) => {
    let value = parseFloat(event.target.value) || 0;
    socket.emit("leftkp", value);
    setLeftKp(value);
  };
  const rightKpChange = (event) => {
    let value = parseFloat(event.target.value) || 0;
    socket.emit("rightkp", value);
    setRightKp(value);
  };

  const leftKiChange = (event) => {
    let value = parseFloat(event.target.value) || 0;
    socket.emit("leftki", value);
    setLeftKi(value);
  };

  const rightKiChange = (event) => {
    let value = parseFloat(event.target.value) || 0;
    socket.emit("rightki", value);
    setRightKi(value);
  };

  const leftKdChange = (event) => {
    let value = parseFloat(event.target.value) || 0;
    socket.emit("leftkd", value);
    setLeftKd(value);
  };
  const rightKdChange = (event) => {
    let value = parseFloat(event.target.value) || 0;
    socket.emit("rightkd", value);
    setRightKd(value);
  };

  const correctionSpeedChange = (event) => {
    let value = parseFloat(event.target.value) || 0;
    socket.emit("correction-speed", value);
    setCorrectionSpeed(value);
  };

  const spinClick = () => {
    let value = -3;
    socket.emit("leftspeed", value);
    // socket.emit("leftleftSpeed", value);
    setLeftSpeed(value);
    socket.emit("rightspeed", -1 * value);
    // socket.emit("rightrightSpeed", value);
    setRightSpeed(value * -1);
  };

  const leftMotorMapping = () => {
    let pwm = 30;
    const intervalId = setInterval(() => {
      if (pwm <= 150) {
        setLeftpwm(pwm);
        socket.emit("leftpwm", pwm);
        // setRightpwm(pwm);
        // socket.emit("rightpwm", pwm);
        pwm++;
      } else {
        clearInterval(intervalId);
        setLeftpwm(0);
        socket.emit("leftpwm", 0);
        setRightpwm(0);
        socket.emit("rightpwm", 0);
      }
    }, 2000);
  };

  const handleRightpwmChange = (event) => {
    let value = parseInt(event.target.value) % 256;
    value = value >= 0 ? value : 0;
    setRightpwm(value);
    socket.emit("rightpwm", value);
  };

  const handleLeftpwmChange = (event) => {
    let value = parseInt(event.target.value) % 256;
    value = value >= 0 ? value : 0;
    setLeftpwm(value);
    socket.emit("leftpwm", value);
  };

  const handleBothpwmChange = (event) => {
    let value = parseInt(event.target.value) % 256;
    value = value >= 0 ? value : 0;
    setLeftpwm(value);
    socket.emit("leftpwm", value);
    setRightpwm(value);
    socket.emit("rightpwm", value);
  };

  const stopAction = () => {
    let value = 0;
    socket.emit("speed", value);
    // socket.emit("leftspeed", value);
    setSpeed(value);
  };

  const resetGraph = () => {
    setData([]);
    setRightData([]);
  };

  const dumpingChange = (e) => {
    let value = e.target.checked ? true : false;
    setDumping(value);
    if (value) {
      socket.emit("dump", 1);
      setDumpCount(1);
    } else {
      socket.emit("dump", 0);
      setDumpCount(0);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div>
            <h1>RightPWM value: {rightpwm}</h1>
            <input
              type="number"
              value={rightpwm}
              onChange={handleRightpwmChange}
            />
          </div>
          <div>
            <h1>leftPWM value: {leftpwm}</h1>
            <input
              type="number"
              value={leftpwm}
              onChange={handleLeftpwmChange}
            />
          </div>
          <div>
            <h1>
              left & Right PWM value: {leftpwm} {rightpwm}
            </h1>
            <input
              type="number"
              value={leftpwm === rightpwm ? leftpwm : 0}
              onChange={handleBothpwmChange}
            />
          </div>
          <div>
            <button
              style={{ marginTop: "20px", padding: "50px" }}
              onClick={stopAction}
            >
              STOP
            </button>
          </div>
          <div>
            <h1>SPEED</h1>
            <input type="number" value={speed} onChange={speedChange} />
            <div style={{ display: "flex" }}>
              <p>LEFT</p>
              <input
                type="number"
                value={leftSpeed}
                onChange={leftSpeedChange}
              />
            </div>
            <div style={{ display: "flex" }}>
              <p>RIGHT</p>
              <input
                type="number"
                value={rightSpeed}
                onChange={rightSpeedChange}
              />
            </div>
            <div style={{ display: "flex" }}>
              <button onClick={spinClick}>spin</button>
            </div>
          </div>
          <div>
            <h1>Correction SPEED</h1>
            <input
              type="number"
              value={correctionSpeed}
              onChange={correctionSpeedChange}
            />
          </div>
          <div>
            <h1>Kp</h1>
            <p>Left</p>
            <input
              type="number"
              value={leftKp}
              min={0}
              step={0.01}
              onChange={leftKpChange}
            />
            <p>Right</p>
            <input
              type="number"
              value={rightKp}
              min={0}
              step={0.01}
              onChange={rightKpChange}
            />
          </div>
          <div>
            <h1>Ki</h1>
            <p>Left</p>
            <input
              type="number"
              value={leftKi}
              min={0}
              step={0.0001}
              onChange={leftKiChange}
            />
            <p>Right</p>
            <input
              type="number"
              value={rightKi}
              min={0}
              step={0.01}
              onChange={rightKiChange}
            />
          </div>
          <div>
            <h1>Kd</h1>
            <p>Left</p>
            <input
              type="number"
              value={leftKd}
              min={0}
              onChange={leftKdChange}
            />
            <p>Right</p>
            <input
              type="number"
              value={rightKd}
              min={0}
              onChange={rightKdChange}
            />
          </div>
          <div>
            <h1>LF PID</h1>
            <SocketInput title="Kp" socketEvent="lfkp" />
            <SocketInput title="Ki" socketEvent="lfki" />
            <SocketInput title="Kd" socketEvent="lfkd" />
          </div>
          <div>
            <h1>MPU PID</h1>
            <SocketInput title="Kp" socketEvent="mpukp" />
            <SocketInput title="Ki" socketEvent="mpuki" />
            <SocketInput title="Kd" socketEvent="mpukd" />
          </div>
          <div>
            <h1>MODE PWM</h1>
            <SocketInput title="Mode PWM" socketEvent="modepwm" />
          </div>
          <div>
            <h1>RESET PID</h1>
            <SocketInput title="reset pid" socketEvent="resetpid" />
            <SocketInput title="MODE pid" socketEvent="pidmode" />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h1>Data</h1>
          <table>
            <thead>
              <tr>
                <th>PWM</th>
                <th>Kecepatan Left</th>
                <th>Kecepatan Right</th>
              </tr>
            </thead>
            <tbody>
              {dataLeft.map((i, idx) => {
                return (
                  <tr key={idx}>
                    <td>{i.pwm}</td>
                    <td>{i.kecepatanLeft * -1}</td>
                    <td>{i.kecepatanRight * -1}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={leftMotorMapping}>MAPPING</button>
          <div>
            <h1>DUMPING</h1>
            <input
              checked={dumping}
              type="checkbox"
              value={dumping}
              onChange={dumpingChange}
            />
            <input
              value={dumpCount}
              type="number"
              onChange={(e) => {
                setDumpCount(parseInt(e.target.value));
                socket.emit("dump", parseInt(e.target.value));
                if (e.target.value === 1) {
                  setDumping(true);
                }
                if (e.target.value === 0) {
                  setDumping(false);
                }
              }}
            />
          </div>
          <div>
            <h1>Sensor Reset {rfidResetState}</h1>
            <input
              value={rfidResetState}
              type="number"
              onChange={(e) => {
                let value = parseInt(e.target.value);
                setRfidResetState(value);
                socket.emit("rfidreset", value);
              }}
            />
            <SocketInput title="reset MPU" socketEvent="mpureset" />
            <SocketInput
              title="TURNING LEFT DELAY"
              socketEvent="turningleftdelay"
            />
          </div>
          <div>
            <h1>CATATAN STATE {state}</h1>
            {state !== 0 && (
              <p>DUmping time: {new Date().getTime() - dumpingTime}</p>
            )}
            <p>DUmping Count: {dumpCount}</p>
            <p>DUmping State: {dumpingState ? 1 : 0}</p>
            <p>Stop Interrupt: {stopInterrupt}</p>
            <p>{note}</p>
          </div>
          <div>
            <h1>Sensor</h1>
            <div>
              {Object.entries(
                sensorData || { status: "Belum terkoneski" }
              )?.map(([namaEntry, valueEntry]) => (
                <p key={namaEntry}>
                  {namaEntry}: {valueEntry}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => setGrafikOn((p) => !p)}>Grafik Toggle</button>
      </div>
      {grafikOn && (
        <div style={{ minHeight: "100vh" }}>
          <h1 style={{ textAlign: "center", fontWeight: "bold", marginTop: 5 }}>
            Grafik
          </h1>
          <button onClick={resetGraph}>RESET</button>
          <p>Kiri</p>
          <RealtimeChart data={data} />
          <p>Kanan</p>
          <RealtimeChart data={rightData} />
          <p>left Desired Speed</p>
          <RealtimeChart data={leftDesiredSpeedData} />
          <p>right Desired Speed</p>
          <RealtimeChart data={rightDesiredSpeedData} />
          <p>line follower error</p>
          <RealtimeChart data={lineFollowerErrorData} />
          <p>MPU</p>
          <RealtimeChart data={mpuData} />
          <hr />
        </div>
      )}
    </>
  );
}
