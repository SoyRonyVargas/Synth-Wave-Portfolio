import { useState, Fragment } from "react";
import SKCATS from "../../data/skills.json";

export default function RvOs() {
  const [si, setSi] = useState(0);
  const sc = SKCATS[si];
  const v = {
    scur: sc,
    snum: "0" + (si + 1),
    sitems: sc.items.map((t, k) => ({ t, n: k + 1 })),
    shasUsed: !!sc.used,
    snoUsed: !sc.used,
  };
  for (let k = 0; k < SKCATS.length; k++) {
    v["son" + k] = si === k;
    v["soff" + k] = si !== k;
    v["spick" + k] = () => setSi(k);
  }
  return (
    <>
      {/* SKILLS: RV-OS frente al ventanal */}{" "}
      <section
        id="skills"
        style={{ position: "relative", overflow: "hidden", background: "#12021f", borderTop: "3px solid #3ff0ff" }}
      >
        {" "}
        <div
          style={{ position: "relative", zIndex: "2", maxWidth: "1240px", margin: "0 auto", padding: "110px 24px 0" }}
        >
          {" "}
          <div style={{ position: "relative", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            {" "}
            <p
              style={{
                margin: "0 0 18px",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "11px",
                letterSpacing: "3px",
                color: "#fff27a",
              }}
            >
              {"03 · RV-OS"}
            </p>{" "}
            <h2
              style={{
                position: "relative",
                display: "inline-block",
                margin: "0 0 18px",
                fontWeight: "400",
                lineHeight: "1",
              }}
            >
              {" "}
              <span className="rw-chrome-wrap" style={{ fontSize: "clamp(40px, 6.4vw, 92px)" }}>
                <span className="rw-chrome-depth" aria-hidden="true">
                  {"SKILLS"}
                </span>
                <span className="rw-chrome">{"SKILLS"}</span>
              </span>{" "}
              <span
                className="rw-script"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "62%",
                  bottom: "-34px",
                  whiteSpace: "nowrap",
                  fontSize: "clamp(34px, 4vw, 58px)",
                  transform: "rotate(-7deg)",
                  color: "#ff2fb3",
                  WebkitTextStroke: "1px #ffe6f7",
                  textShadow: "0 0 6px #ff2fb3, 0 0 18px #ff2fb3",
                }}
              >
                {"golden hour"}
              </span>{" "}
            </h2>{" "}
            <p
              style={{
                margin: "40px auto 44px",
                maxWidth: "640px",
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#d9c8f5",
              }}
            >
              {
                "Frente al ventanal, con la ciudad al atardecer: abre una carpeta en la pantalla y la ventana te muestra todo lo que trae esa área."
              }
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div style={{ position: "relative", zIndex: "1", maxWidth: "1280px", height: "780px", margin: "0 auto" }}>
          {" "}
          <div
            aria-hidden="true"
            className="rw-hide-sm"
            style={{
              position: "absolute",
              left: "4%",
              right: "4%",
              top: "0",
              height: "560px",
              border: "14px solid #2a1550",
              overflow: "hidden",
              background: "linear-gradient(180deg, #0b0420 0%, #1a0838 35%, #4a0f6b 60%, #b0186e 82%, #ff5e7e 100%)",
              boxShadow: "0 0 80px rgba(255,94,126,.3)",
            }}
          >
            {" "}
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: "120px",
                width: "300px",
                height: "300px",
                translate: "-50% 0",
                filter: "drop-shadow(0 0 50px rgba(255,94,126,.6))",
              }}
            >
              <div
                className="rw-hsun"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "linear-gradient(180deg, #fff27a 0%, #ffb347 35%, #ff5e7e 65%, #ff2fb3 100%)",
                }}
              ></div>
            </div>{" "}
            <svg
              viewBox="0 0 1440 380"
              preserveAspectRatio="xMidYMax slice"
              style={{ position: "absolute", left: "0", right: "0", bottom: "0", width: "100%", height: "62%" }}
            >
              {" "}
              <defs>
                <linearGradient id="rwHaze2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff5e7e" stopOpacity="0"></stop>
                  <stop offset="1" stopColor="#ff5e7e" stopOpacity=".35"></stop>
                </linearGradient>
              </defs>{" "}
              <g fill="#4a1a62" opacity=".72">
                <rect x="-20" y="292" width="22" height="88"></rect>
                <rect x="-15" y="270" width="12" height="22"></rect>
                <rect x="5" y="274" width="43" height="106"></rect>
                <rect x="18" y="254" width="17" height="20"></rect>
                <rect x="54" y="300" width="42" height="80"></rect>
                <rect x="74" y="279" width="2" height="32"></rect>
                <rect x="96" y="259" width="46" height="121"></rect>
                <rect x="110" y="234" width="18" height="25"></rect>
                <rect x="118" y="208" width="2" height="20"></rect>
                <rect x="145" y="295" width="41" height="85"></rect>
                <rect x="189" y="267" width="35" height="113"></rect>
                <rect x="196" y="245" width="21" height="22"></rect>
                <rect x="224" y="283" width="31" height="97"></rect>
                <rect x="229" y="266" width="21" height="17"></rect>
                <rect x="238" y="242" width="2" height="30"></rect>
                <rect x="258" y="268" width="34" height="112"></rect>
                <rect x="265" y="245" width="19" height="23"></rect>
                <rect x="296" y="288" width="30" height="92"></rect>
                <rect x="329" y="266" width="31" height="114"></rect>
                <rect x="366" y="233" width="39" height="147"></rect>
                <rect x="374" y="222" width="23" height="11"></rect>
                <rect x="409" y="225" width="44" height="155"></rect>
                <rect x="456" y="234" width="19" height="146"></rect>
                <rect x="479" y="216" width="36" height="164"></rect>
                <rect x="496" y="195" width="2" height="14"></rect>
                <rect x="521" y="187" width="24" height="193"></rect>
                <rect x="548" y="215" width="34" height="165"></rect>
                <rect x="585" y="174" width="26" height="206"></rect>
                <rect x="614" y="173" width="43" height="207"></rect>
                <rect x="661" y="182" width="24" height="198"></rect>
                <rect x="687" y="151" width="36" height="229"></rect>
                <rect x="695" y="128" width="19" height="23"></rect>
                <rect x="726" y="259" width="29" height="121"></rect>
                <rect x="759" y="177" width="28" height="203"></rect>
                <rect x="792" y="166" width="23" height="214"></rect>
                <rect x="821" y="226" width="35" height="154"></rect>
                <rect x="827" y="216" width="23" height="10"></rect>
                <rect x="837" y="202" width="2" height="28"></rect>
                <rect x="856" y="227" width="42" height="153"></rect>
                <rect x="868" y="214" width="18" height="13"></rect>
                <rect x="898" y="251" width="23" height="129"></rect>
                <rect x="902" y="235" width="15" height="16"></rect>
                <rect x="923" y="227" width="32" height="153"></rect>
                <rect x="938" y="204" width="2" height="26"></rect>
                <rect x="957" y="252" width="31" height="128"></rect>
                <rect x="965" y="228" width="14" height="24"></rect>
                <rect x="992" y="282" width="31" height="98"></rect>
                <rect x="999" y="273" width="16" height="9"></rect>
                <rect x="1024" y="212" width="32" height="168"></rect>
                <rect x="1057" y="214" width="38" height="166"></rect>
                <rect x="1095" y="246" width="30" height="134"></rect>
                <rect x="1130" y="276" width="27" height="104"></rect>
                <rect x="1159" y="285" width="20" height="95"></rect>
                <rect x="1162" y="272" width="13" height="13"></rect>
                <rect x="1181" y="294" width="22" height="86"></rect>
                <rect x="1207" y="268" width="44" height="112"></rect>
                <rect x="1252" y="231" width="44" height="149"></rect>
                <rect x="1264" y="220" width="20" height="11"></rect>
                <rect x="1273" y="193" width="2" height="32"></rect>
                <rect x="1297" y="286" width="33" height="94"></rect>
                <rect x="1334" y="298" width="33" height="82"></rect>
                <rect x="1340" y="281" width="21" height="17"></rect>
                <rect x="1349" y="261" width="2" height="24"></rect>
                <rect x="1373" y="283" width="36" height="97"></rect>
                <rect x="1383" y="272" width="16" height="11"></rect>
                <rect x="1413" y="232" width="29" height="148"></rect>
                <rect x="1443" y="295" width="20" height="85"></rect>
                <rect x="1448" y="270" width="9" height="25"></rect>
                <rect x="1452" y="246" width="2" height="33"></rect>
              </g>{" "}
              <rect x="0" y="220" width="1440" height="160" fill="url(#rwHaze2)"></rect>{" "}
              <g fill="#2e0e46">
                <rect x="-20" y="319" width="25" height="61"></rect>
                <rect x="-16" y="302" width="16" height="17"></rect>
                <rect x="12" y="296" width="54" height="84"></rect>
                <rect x="72" y="263" width="51" height="117"></rect>
                <rect x="85" y="240" width="24" height="23"></rect>
                <rect x="131" y="295" width="30" height="85"></rect>
                <rect x="139" y="286" width="13" height="9"></rect>
                <rect x="163" y="279" width="22" height="101"></rect>
                <rect x="192" y="317" width="36" height="63"></rect>
                <rect x="228" y="321" width="30" height="59"></rect>
                <rect x="236" y="308" width="13" height="13"></rect>
                <rect x="242" y="274" width="2" height="21"></rect>
                <rect x="262" y="296" width="27" height="84"></rect>
                <rect x="289" y="295" width="33" height="85"></rect>
                <rect x="299" y="273" width="13" height="22"></rect>
                <rect x="327" y="273" width="40" height="107"></rect>
                <rect x="334" y="252" width="26" height="21"></rect>
                <rect x="346" y="229" width="2" height="20"></rect>
                <rect x="374" y="273" width="40" height="107"></rect>
                <rect x="393" y="248" width="2" height="22"></rect>
                <rect x="419" y="296" width="50" height="84"></rect>
                <rect x="443" y="265" width="2" height="27"></rect>
                <rect x="470" y="238" width="36" height="142"></rect>
                <rect x="509" y="264" width="26" height="116"></rect>
                <rect x="515" y="254" width="14" height="10"></rect>
                <rect x="537" y="292" width="25" height="88"></rect>
                <rect x="564" y="227" width="52" height="153"></rect>
                <rect x="624" y="243" width="42" height="137"></rect>
                <rect x="670" y="250" width="27" height="130"></rect>
                <rect x="675" y="241" width="16" height="9"></rect>
                <rect x="704" y="251" width="53" height="129"></rect>
                <rect x="759" y="226" width="45" height="154"></rect>
                <rect x="769" y="211" width="25" height="15"></rect>
                <rect x="780" y="191" width="2" height="15"></rect>
                <rect x="806" y="309" width="42" height="71"></rect>
                <rect x="848" y="268" width="51" height="112"></rect>
                <rect x="872" y="246" width="2" height="14"></rect>
                <rect x="904" y="269" width="25" height="111"></rect>
                <rect x="930" y="247" width="53" height="133"></rect>
                <rect x="983" y="279" width="31" height="101"></rect>
                <rect x="997" y="248" width="2" height="31"></rect>
                <rect x="1018" y="302" width="54" height="78"></rect>
                <rect x="1031" y="294" width="27" height="8"></rect>
                <rect x="1073" y="268" width="22" height="112"></rect>
                <rect x="1077" y="242" width="14" height="26"></rect>
                <rect x="1102" y="257" width="32" height="123"></rect>
                <rect x="1117" y="232" width="2" height="18"></rect>
                <rect x="1137" y="265" width="32" height="115"></rect>
                <rect x="1142" y="246" width="21" height="19"></rect>
                <rect x="1175" y="262" width="50" height="118"></rect>
                <rect x="1231" y="268" width="53" height="112"></rect>
                <rect x="1256" y="248" width="2" height="32"></rect>
                <rect x="1289" y="281" width="52" height="99"></rect>
                <rect x="1297" y="268" width="35" height="13"></rect>
                <rect x="1314" y="240" width="2" height="34"></rect>
                <rect x="1342" y="313" width="54" height="67"></rect>
                <rect x="1398" y="262" width="41" height="118"></rect>
                <rect x="1404" y="247" width="28" height="15"></rect>
                <rect x="1441" y="300" width="54" height="80"></rect>
                <rect x="1454" y="280" width="28" height="20"></rect>
              </g>
              <g opacity=".8">
                <rect x="-6" y="329" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="145" y="305" width="4" height="6" fill="#ffb347"></rect>
                <rect x="136" y="333" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="136" y="347" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="168" y="303" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="168" y="345" width="4" height="6" fill="#ffb347"></rect>
                <rect x="267" y="334" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="303" y="333" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="312" y="361" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="350" y="283" width="4" height="6" fill="#ffb347"></rect>
                <rect x="332" y="311" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="350" y="367" width="4" height="6" fill="#ffb347"></rect>
                <rect x="388" y="367" width="4" height="6" fill="#ffb347"></rect>
                <rect x="451" y="334" width="4" height="6" fill="#ffb347"></rect>
                <rect x="475" y="262" width="4" height="6" fill="#ffb347"></rect>
                <rect x="493" y="346" width="4" height="6" fill="#ffb347"></rect>
                <rect x="523" y="302" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="542" y="330" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="569" y="279" width="4" height="6" fill="#ffb347"></rect>
                <rect x="629" y="309" width="4" height="6" fill="#ffb347"></rect>
                <rect x="647" y="323" width="4" height="6" fill="#ffb347"></rect>
                <rect x="727" y="317" width="4" height="6" fill="#ffb347"></rect>
                <rect x="727" y="331" width="4" height="6" fill="#ffb347"></rect>
                <rect x="782" y="348" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="791" y="362" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="880" y="362" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="944" y="369" width="4" height="6" fill="#ffb347"></rect>
                <rect x="953" y="369" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1032" y="340" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1023" y="354" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1107" y="267" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1125" y="323" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1116" y="337" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1216" y="286" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1198" y="300" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1216" y="342" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1272" y="306" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1254" y="334" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1254" y="362" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1321" y="305" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1374" y="323" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1374" y="337" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1403" y="328" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1455" y="310" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1473" y="352" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1482" y="352" width="4" height="6" fill="#ff9a6a"></rect>
                <rect x="1464" y="366" width="4" height="6" fill="#ffb347"></rect>
              </g>{" "}
              <g fill="#16062a">
                <rect x="-20" y="275" width="49" height="105"></rect>
                <rect x="35" y="312" width="74" height="68"></rect>
                <rect x="109" y="270" width="72" height="110"></rect>
                <rect x="181" y="316" width="57" height="64"></rect>
                <rect x="243" y="318" width="77" height="62"></rect>
                <rect x="323" y="283" width="36" height="97"></rect>
                <rect x="367" y="286" width="68" height="94"></rect>
                <rect x="378" y="275" width="45" height="11"></rect>
                <rect x="435" y="274" width="57" height="106"></rect>
                <rect x="500" y="252" width="39" height="128"></rect>
                <rect x="507" y="239" width="25" height="13"></rect>
                <rect x="544" y="271" width="69" height="109"></rect>
                <rect x="614" y="332" width="59" height="48"></rect>
                <rect x="674" y="282" width="50" height="98"></rect>
                <rect x="686" y="264" width="26" height="18"></rect>
                <rect x="698" y="240" width="2" height="24"></rect>
                <rect x="728" y="234" width="77" height="146"></rect>
                <rect x="809" y="315" width="76" height="65"></rect>
                <rect x="823" y="306" width="48" height="9"></rect>
                <rect x="846" y="273" width="2" height="21"></rect>
                <rect x="885" y="303" width="80" height="77"></rect>
                <rect x="970" y="332" width="54" height="48"></rect>
                <rect x="983" y="322" width="28" height="10"></rect>
                <rect x="1034" y="334" width="59" height="46"></rect>
                <rect x="1099" y="316" width="62" height="64"></rect>
                <rect x="1162" y="272" width="55" height="108"></rect>
                <rect x="1175" y="258" width="29" height="14"></rect>
                <rect x="1224" y="323" width="58" height="57"></rect>
                <rect x="1241" y="306" width="23" height="17"></rect>
                <rect x="1291" y="281" width="63" height="99"></rect>
                <rect x="1357" y="314" width="57" height="66"></rect>
                <rect x="1370" y="295" width="30" height="19"></rect>
                <rect x="1418" y="287" width="49" height="93"></rect>
              </g>
              <g className="rw-winblink">
                <rect x="3" y="285" width="4" height="6" fill="#ffb347"></rect>
                <rect x="-6" y="327" width="4" height="6" fill="#ffb347"></rect>
                <rect x="21" y="327" width="4" height="6" fill="#ffb347"></rect>
                <rect x="3" y="369" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="94" y="322" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="85" y="350" width="4" height="6" fill="#fff27a"></rect>
                <rect x="159" y="280" width="4" height="6" fill="#ffb347"></rect>
                <rect x="168" y="280" width="4" height="6" fill="#fff27a"></rect>
                <rect x="275" y="370" width="4" height="6" fill="#fff27a"></rect>
                <rect x="337" y="307" width="4" height="6" fill="#fff27a"></rect>
                <rect x="346" y="321" width="4" height="6" fill="#fff27a"></rect>
                <rect x="337" y="349" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="426" y="310" width="4" height="6" fill="#fff27a"></rect>
                <rect x="426" y="324" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="381" y="338" width="4" height="6" fill="#ffb347"></rect>
                <rect x="399" y="338" width="4" height="6" fill="#ffb347"></rect>
                <rect x="408" y="338" width="4" height="6" fill="#ffb347"></rect>
                <rect x="426" y="366" width="4" height="6" fill="#ffb347"></rect>
                <rect x="467" y="312" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="449" y="326" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="458" y="368" width="4" height="6" fill="#ffb347"></rect>
                <rect x="523" y="262" width="4" height="6" fill="#ffb347"></rect>
                <rect x="523" y="290" width="4" height="6" fill="#fff27a"></rect>
                <rect x="523" y="318" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="523" y="332" width="4" height="6" fill="#ffb347"></rect>
                <rect x="603" y="365" width="4" height="6" fill="#fff27a"></rect>
                <rect x="796" y="272" width="4" height="6" fill="#ffb347"></rect>
                <rect x="733" y="286" width="4" height="6" fill="#fff27a"></rect>
                <rect x="733" y="300" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="796" y="328" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="778" y="356" width="4" height="6" fill="#fff27a"></rect>
                <rect x="832" y="325" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="850" y="353" width="4" height="6" fill="#ffb347"></rect>
                <rect x="823" y="367" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="850" y="367" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="917" y="313" width="4" height="6" fill="#ffb347"></rect>
                <rect x="899" y="327" width="4" height="6" fill="#fff27a"></rect>
                <rect x="926" y="327" width="4" height="6" fill="#ffb347"></rect>
                <rect x="917" y="341" width="4" height="6" fill="#fff27a"></rect>
                <rect x="926" y="341" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="935" y="341" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="944" y="341" width="4" height="6" fill="#ffb347"></rect>
                <rect x="944" y="369" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="975" y="342" width="4" height="6" fill="#ffb347"></rect>
                <rect x="993" y="342" width="4" height="6" fill="#fff27a"></rect>
                <rect x="1002" y="342" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1113" y="340" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1131" y="340" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="1140" y="354" width="4" height="6" fill="#fff27a"></rect>
                <rect x="1149" y="368" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="1167" y="282" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1176" y="324" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1229" y="333" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="1238" y="347" width="4" height="6" fill="#fff27a"></rect>
                <rect x="1305" y="305" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1314" y="319" width="4" height="6" fill="#fff27a"></rect>
                <rect x="1341" y="319" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="1296" y="347" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1389" y="324" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1371" y="338" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1380" y="338" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="1423" y="297" width="4" height="6" fill="#ff6aa8"></rect>
                <rect x="1432" y="297" width="4" height="6" fill="#fff27a"></rect>
                <rect x="1441" y="325" width="4" height="6" fill="#ffb347"></rect>
                <rect x="1450" y="325" width="4" height="6" fill="#fff27a"></rect>
                <rect x="1459" y="325" width="4" height="6" fill="#ff6aa8"></rect>
              </g>{" "}
              <g transform="translate(330 380) scale(0.55 0.55)" fill="none" stroke="#0a0118" strokeLinecap="round">
                <path d="M0 0 C-2 -90 -10 -170 -28 -270" strokeWidth="10"></path>
                <g strokeWidth="6">
                  <path d="M-28 -270 C-60 -300 -90 -295 -116 -270"></path>
                  <path d="M-28 -270 C-50 -320 -80 -330 -106 -324"></path>
                  <path d="M-28 -270 C-24 -320 0 -340 30 -344"></path>
                  <path d="M-28 -270 C10 -300 50 -292 80 -264"></path>
                  <path d="M-28 -270 C0 -270 30 -245 42 -210"></path>
                  <path d="M-28 -270 C-56 -260 -76 -230 -80 -196"></path>
                </g>
              </g>
              <g transform="translate(1120 380) scale(-0.5 0.5)" fill="none" stroke="#0a0118" strokeLinecap="round">
                <path d="M0 0 C-2 -90 -10 -170 -28 -270" strokeWidth="10"></path>
                <g strokeWidth="6">
                  <path d="M-28 -270 C-60 -300 -90 -295 -116 -270"></path>
                  <path d="M-28 -270 C-50 -320 -80 -330 -106 -324"></path>
                  <path d="M-28 -270 C-24 -320 0 -340 30 -344"></path>
                  <path d="M-28 -270 C10 -300 50 -292 80 -264"></path>
                  <path d="M-28 -270 C0 -270 30 -245 42 -210"></path>
                  <path d="M-28 -270 C-56 -260 -76 -230 -80 -196"></path>
                </g>
              </g>
              <g transform="translate(1210 380) scale(0.38 0.38)" fill="none" stroke="#0a0118" strokeLinecap="round">
                <path d="M0 0 C-2 -90 -10 -170 -28 -270" strokeWidth="10"></path>
                <g strokeWidth="6">
                  <path d="M-28 -270 C-60 -300 -90 -295 -116 -270"></path>
                  <path d="M-28 -270 C-50 -320 -80 -330 -106 -324"></path>
                  <path d="M-28 -270 C-24 -320 0 -340 30 -344"></path>
                  <path d="M-28 -270 C10 -300 50 -292 80 -264"></path>
                  <path d="M-28 -270 C0 -270 30 -245 42 -210"></path>
                  <path d="M-28 -270 C-56 -260 -76 -230 -80 -196"></path>
                </g>
              </g>{" "}
              <rect x="0" y="377" width="1440" height="3" fill="#ffb347" opacity=".7"></rect>{" "}
            </svg>{" "}
            <div
              style={{
                position: "absolute",
                inset: "0",
                background: "repeating-linear-gradient(180deg, rgba(12,3,30,.78) 0 9px, transparent 9px 26px)",
              }}
            ></div>{" "}
            <div
              style={{
                position: "absolute",
                left: "33.3%",
                top: "0",
                bottom: "0",
                width: "8px",
                background: "#2a1550",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: "66.6%",
                top: "0",
                bottom: "0",
                width: "8px",
                background: "#2a1550",
              }}
            ></div>{" "}
          </div>{" "}
          <div
            className="k6-light rw-hide-sm"
            aria-hidden="true"
            style={{
              left: "0",
              top: "160px",
              width: "340px",
              height: "380px",
              transform: "skewX(24deg)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000)",
              maskImage: "linear-gradient(to right, transparent, #000)",
            }}
          ></div>{" "}
          <figure
            className="rw-hide-sm"
            style={{ position: "absolute", zIndex: "3", margin: "0", left: "5.5%", bottom: "96px" }}
          >
            <div className="rw-lava" role="img" aria-label="Lámpara de lava encendida"></div>
          </figure>{" "}
          <div
            className="rw-hide-sm"
            aria-hidden="true"
            style={{
              position: "absolute",
              zIndex: "2",
              right: "2%",
              bottom: "70px",
              width: "340px",
              height: "90px",
              borderRadius: "50%",
              background: "radial-gradient(closest-side, rgba(255,211,138,.42), rgba(255,47,179,.12) 60%, transparent)",
            }}
          ></div>{" "}
          <img
            className="rw-hide-sm"
            src="/assets/desk-lamp.webp"
            alt="Lámpara de escritorio de brazo articulado, rosa neón"
            style={{
              position: "absolute",
              zIndex: "3",
              right: "-1%",
              bottom: "92px",
              width: "230px",
              height: "auto",
              filter: "drop-shadow(0 0 18px rgba(255,47,179,.45)) drop-shadow(0 18px 20px rgba(0,0,0,.5))",
            }}
          />{" "}
          <div style={{ position: "absolute", zIndex: "4", left: "50%", bottom: "80px", translate: "-50% 0" }}>
            <div className="v5-pc " style={{ width: "860px", maxWidth: "100%" }}>
              {" "}
              <img src="/assets/computer.webp" alt="Computadora retro con el sistema RV-OS en pantalla" />{" "}
              <div className="v5-scr">
                <div className="f5-wall" aria-hidden="true"></div>{" "}
                <div className="f5-bar">
                  <b style={{ color: "#ff2fb3" }}>{"RV-OS"}</b>
                  <span>{"SKILLS"}</span>
                  <span>{"AYUDA"}</span>
                  <span style={{ marginLeft: "auto", color: "#fff27a" }}>{"6 CARPETAS"}</span>
                </div>{" "}
                <div className="f5-desk">
                  {" "}
                  <div className="f5-icons" role="group" aria-label="Carpetas de habilidades">
                    {" "}
                    {v.son0 && (
                      <>
                        <button type="button" className="f5-ico f5-ico-on" onClick={v.spick0} aria-pressed="true">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#ff2fb3" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="#ff2fb3"
                              stroke="#ff2fb3"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#0b0420" strokeWidth="2"></path>
                          </svg>
                          <span>{"BACKEND"}</span>
                        </button>
                      </>
                    )}
                    {v.soff0 && (
                      <>
                        <button type="button" className="f5-ico" onClick={v.spick0} aria-pressed="false">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#ff2fb3" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="rgba(11,4,32,.85)"
                              stroke="#ff2fb3"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#ff2fb3" strokeWidth="2"></path>
                          </svg>
                          <span>{"BACKEND"}</span>
                        </button>
                      </>
                    )}
                    {v.son1 && (
                      <>
                        <button type="button" className="f5-ico f5-ico-on" onClick={v.spick1} aria-pressed="true">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#3ff0ff" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="#3ff0ff"
                              stroke="#3ff0ff"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#0b0420" strokeWidth="2"></path>
                          </svg>
                          <span>{"FRONTEND"}</span>
                        </button>
                      </>
                    )}
                    {v.soff1 && (
                      <>
                        <button type="button" className="f5-ico" onClick={v.spick1} aria-pressed="false">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#3ff0ff" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="rgba(11,4,32,.85)"
                              stroke="#3ff0ff"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#3ff0ff" strokeWidth="2"></path>
                          </svg>
                          <span>{"FRONTEND"}</span>
                        </button>
                      </>
                    )}
                    {v.son2 && (
                      <>
                        <button type="button" className="f5-ico f5-ico-on" onClick={v.spick2} aria-pressed="true">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#fff27a" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="#fff27a"
                              stroke="#fff27a"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#0b0420" strokeWidth="2"></path>
                          </svg>
                          <span>{"DATOS"}</span>
                        </button>
                      </>
                    )}
                    {v.soff2 && (
                      <>
                        <button type="button" className="f5-ico" onClick={v.spick2} aria-pressed="false">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#fff27a" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="rgba(11,4,32,.85)"
                              stroke="#fff27a"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#fff27a" strokeWidth="2"></path>
                          </svg>
                          <span>{"DATOS"}</span>
                        </button>
                      </>
                    )}
                    {v.son3 && (
                      <>
                        <button type="button" className="f5-ico f5-ico-on" onClick={v.spick3} aria-pressed="true">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#b26bff" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="#b26bff"
                              stroke="#b26bff"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#0b0420" strokeWidth="2"></path>
                          </svg>
                          <span>{"APIS"}</span>
                        </button>
                      </>
                    )}
                    {v.soff3 && (
                      <>
                        <button type="button" className="f5-ico" onClick={v.spick3} aria-pressed="false">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#b26bff" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="rgba(11,4,32,.85)"
                              stroke="#b26bff"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#b26bff" strokeWidth="2"></path>
                          </svg>
                          <span>{"APIS"}</span>
                        </button>
                      </>
                    )}
                    {v.son4 && (
                      <>
                        <button type="button" className="f5-ico f5-ico-on" onClick={v.spick4} aria-pressed="true">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#7dffcf" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="#7dffcf"
                              stroke="#7dffcf"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#0b0420" strokeWidth="2"></path>
                          </svg>
                          <span>{"DEVOPS"}</span>
                        </button>
                      </>
                    )}
                    {v.soff4 && (
                      <>
                        <button type="button" className="f5-ico" onClick={v.spick4} aria-pressed="false">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#7dffcf" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="rgba(11,4,32,.85)"
                              stroke="#7dffcf"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#7dffcf" strokeWidth="2"></path>
                          </svg>
                          <span>{"DEVOPS"}</span>
                        </button>
                      </>
                    )}
                    {v.son5 && (
                      <>
                        <button type="button" className="f5-ico f5-ico-on" onClick={v.spick5} aria-pressed="true">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#ff9a5a" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="#ff9a5a"
                              stroke="#ff9a5a"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#0b0420" strokeWidth="2"></path>
                          </svg>
                          <span>{"OTROS"}</span>
                        </button>
                      </>
                    )}
                    {v.soff5 && (
                      <>
                        <button type="button" className="f5-ico" onClick={v.spick5} aria-pressed="false">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 40 32"
                            width="40"
                            height="32"
                            style={{ color: "#ff9a5a" }}
                          >
                            <path
                              d="M2 6h13l4 4h19v20H2z"
                              fill="rgba(11,4,32,.85)"
                              stroke="#ff9a5a"
                              strokeWidth="2.5"
                              strokeLinejoin="round"
                            ></path>
                            <path d="M2 12h36" stroke="#ff9a5a" strokeWidth="2"></path>
                          </svg>
                          <span>{"OTROS"}</span>
                        </button>
                      </>
                    )}{" "}
                  </div>{" "}
                  <div className="f5-win">
                    {" "}
                    <div className="f5-wt">
                      <i aria-hidden="true"></i>
                      <span>{v.scur.name}</span>
                    </div>{" "}
                    <ul className="f5-list">
                      {v.sitems.map((it, _i) => (
                        <Fragment key={_i}>
                          <li>{it.t}</li>
                        </Fragment>
                      ))}
                    </ul>{" "}
                    {v.shasUsed && (
                      <>
                        <p className="f5-st">
                          {"USADO EN: "}
                          {v.scur.used}
                        </p>
                      </>
                    )}{" "}
                    {v.snoUsed && (
                      <>
                        <p className="f5-st">{"PARTE DE MI STACK"}</p>
                      </>
                    )}{" "}
                  </div>{" "}
                </div>
              </div>{" "}
            </div>
          </div>{" "}
          <div style={{ position: "absolute", zIndex: "6", left: "calc(50% + 340px)", bottom: "92px" }}>
            <img
              className="rw-hide-sm"
              src="/assets/mug.webp"
              alt="Taza de café con el sol retrowave y la palabra Rony"
              style={{
                display: "block",
                width: "120px",
                height: "auto",
                filter: "drop-shadow(0 0 14px rgba(255,47,179,.4)) drop-shadow(0 12px 14px rgba(0,0,0,.5))",
              }}
            />
          </div>{" "}
        </div>{" "}
        <div className="k6-desk" aria-hidden="true" style={{ marginTop: "-96px" }}></div>{" "}
      </section>
    </>
  );
}
