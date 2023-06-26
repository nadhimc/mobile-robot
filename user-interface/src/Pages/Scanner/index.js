import { useRef, useState, useEffect } from "react";
import DashboardHeader from "../../Components/DashboardHeader";
import { Html5QrcodeScanner } from "html5-qrcode";
import io from "socket.io-client";
import MyFetchFunction from "../../Helpers/MyFetchFunction";

const Scanner = () => {
  const scannerRef = useRef();
  const [state, setState] = useState(0);
  const [socket, setSocket] = useState(null);
  const [result, setResult] = useState();
  const [tujuan, setTujuan] = useState([]);
  let html5QrcodeScanner = useRef();

  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    try {
      let data = JSON.parse(decodedText);
      let codeDestination = data.k2;
      let destination = tujuan.find((i) => i.kode === codeDestination);
      if (destination) {
        socket.emit("destination", destination.rfid);
        setResult(destination?.label);
        alert("letakkan paket diatas robot");
        setState(0);
        html5QrcodeScanner.current.clear();
      } else {
        alert(`tujuan ${codeDestination} tidak valid`);
      }
    } catch (e) {
      alert("error");
    }
  }

  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // console.warn(`Code scan error = ${error}`);
  }

  useEffect(() => {
    html5QrcodeScanner.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
  }, []);

  useEffect(() => {
    // Inisialisasi socket.io saat komponen di-mount
    const sockett = io("http://192.168.18.57:3008");
    setSocket(sockett);

    // Membersihkan socket.io saat komponen di-unmount
    return () => {
      sockett.disconnect();
    };
  }, []);

  useEffect(() => {
    async function getData() {
      let fetchTujuan = await MyFetchFunction("api/scanner");
      if (fetchTujuan) {
        setTujuan(fetchTujuan);
      }
    }
    getData();
  }, []);

  function scannerOn() {
    setState(1);
    if (scannerRef?.current) {
      html5QrcodeScanner.current.render(onScanSuccess, onScanFailure);
    }
  }

  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-5 overflow-y-auto max-h-screen">
      <DashboardHeader />
      <div className="mt-8">
        {state === 0 && (
          <div>
            <button
              onClick={scannerOn}
              className="text-white rounded-lg shadow-lg mx-auto py-2 px-6 bg-blue-500 block"
            >
              Mulai Scan QR Code
            </button>
          </div>
        )}
        <div ref={scannerRef} id="reader" width="600px"></div>
        <div className="text-center mt-5">{result}</div>
      </div>
    </div>
  );
};

export default Scanner;
