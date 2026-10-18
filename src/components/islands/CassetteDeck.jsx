import { useState, Fragment } from "react";
import JOBS from "../../data/jobs.json";

export default function CassetteDeck() {
  const [di, setDi] = useState(0);
  const dc = JOBS[di],
    n = JOBS.length;
  const v = {
    dcur: dc,
    dtrack: "0" + (di + 1),
    dlist: dc.bullets.map((t, k) => ({ n: "A" + (k + 1), t })),
    dprev: () => setDi((di + n - 1) % n),
    dnext: () => setDi((di + 1) % n),
  };
  for (let k = 0; k < n; k++) {
    v["dsel" + k] = di === k;
    v["didle" + k] = di !== k;
    v["dpick" + k] = () => setDi(k);
  }
  return (
    <>
      {/* EXPERIENCIA: deck de casetes */}{" "}
      <section
        id="experiencia"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, #12021f 0%, #1a0838 25%, #22104a 70%, #12021f 100%)",
        }}
      >
        {" "}
        <div
          className="rw-stars-static"
          aria-hidden="true"
          style={{ position: "absolute", inset: "0 0 50% 0", opacity: ".8" }}
        ></div>{" "}
        <div
          style={{
            position: "relative",
            zIndex: "2",
            maxWidth: "1160px",
            margin: "0 auto",
            padding: "96px 24px 600px",
          }}
        >
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
            {"02 · EXPERIENCIA"}
          </p>{" "}
          <h2 style={{ position: "relative", margin: "0 0 18px", fontWeight: "400", lineHeight: "1" }}>
            {" "}
            <span className="rw-chrome-wrap" style={{ fontSize: "clamp(40px, 6.4vw, 92px)" }}>
              <span className="rw-chrome-depth" aria-hidden="true">
                {"EXPERIENCIA"}
              </span>
              <span className="rw-chrome">{"EXPERIENCIA"}</span>
            </span>{" "}
            <span
              className="rw-script"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "clamp(160px, 38vw, 520px)",
                bottom: "-34px",
                fontSize: "clamp(34px, 4vw, 58px)",
                transform: "rotate(-7deg)",
                color: "#3ff0ff",
                WebkitTextStroke: "1px #e6fdff",
                textShadow: "0 0 6px #3ff0ff, 0 0 18px #3ff0ff",
              }}
            >
              {"side A & B"}
            </span>{" "}
          </h2>{" "}
          <p
            style={{ margin: "40px 0 56px", maxWidth: "600px", fontSize: "16px", lineHeight: "1.6", color: "#d9c8f5" }}
          >
            {
              "Elige un casete del estante y mételo al deck: el display te dice dónde y cuánto tiempo, y abajo sale la lista de canciones de ese trabajo."
            }
          </p>{" "}
          {/* deck */}{" "}
          <div className="xp-deck">
            {" "}
            <div
              style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: "26px", alignItems: "stretch" }}
            >
              {" "}
              <div className="xp-window" style={{ flex: "1 1 420px", minWidth: "0" }}>
                {" "}
                {v.dsel0 && (
                  <>
                    <img
                      className="xp-in"
                      src="/assets/cassette-upnify.webp"
                      alt="Casete 2024 · UPNIFY"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        filter: "drop-shadow(0 0 26px rgba(255,47,179,.55))",
                      }}
                    />
                  </>
                )}{" "}
                {v.dsel1 && (
                  <>
                    <img
                      className="xp-in"
                      src="/assets/cassette-upqroo.webp"
                      alt="Casete 2023 · UPQROO"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        filter: "drop-shadow(0 0 26px rgba(63,240,255,.55))",
                      }}
                    />
                  </>
                )}{" "}
                {v.dsel2 && (
                  <>
                    <img
                      className="xp-in"
                      src="/assets/cassette-hiplot.webp"
                      alt="Casete 2021 · HIPLOT"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        filter: "drop-shadow(0 0 26px rgba(255,242,122,.55))",
                      }}
                    />
                  </>
                )}{" "}
                {v.dsel3 && (
                  <>
                    <img
                      className="xp-in"
                      src="/assets/cassette-freelance.webp"
                      alt="Casete 2020 · FREELANCE"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        filter: "drop-shadow(0 0 26px rgba(178,107,255,.55))",
                      }}
                    />
                  </>
                )}{" "}
                <p
                  style={{
                    position: "absolute",
                    left: "18px",
                    top: "12px",
                    margin: "0",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "8px",
                    color: "#8f80b8",
                  }}
                >
                  {"CASSETTE DECK · RV-2026"}
                </p>{" "}
              </div>{" "}
              <div style={{ flex: "1 1 380px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
                {" "}
                <div className="xp-lcd">
                  {" "}
                  <p
                    style={{
                      margin: "0",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      letterSpacing: "2px",
                    }}
                  >
                    <span>
                      {"TRACK "}
                      {v.dtrack}
                      {" / 04"}
                    </span>
                    <span style={{ color: "#fff27a", textShadow: "0 0 8px rgba(255,242,122,.8)" }}>{"▶ PLAY"}</span>
                  </p>{" "}
                  <p style={{ margin: "10px 0 4px", fontSize: "34px", lineHeight: "1.05", letterSpacing: "2px" }}>
                    {v.dcur.short}
                  </p>{" "}
                  <p
                    style={{
                      margin: "0",
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "9px",
                      lineHeight: "1.8",
                      color: "#b8f9ff",
                    }}
                  >
                    {v.dcur.dates}
                    {" · "}
                    {v.dcur.place}
                  </p>{" "}
                  <p
                    style={{
                      margin: "6px 0 14px",
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "9px",
                      color: "#ff8ad8",
                      textShadow: "0 0 8px rgba(255,47,179,.7)",
                    }}
                  >
                    {"DURACIÓN "}
                    {v.dcur.dur}
                  </p>{" "}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "18px 1fr",
                      gap: "6px 8px",
                      alignItems: "center",
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "8px",
                    }}
                  >
                    <span>{"L"}</span>
                    <div className="xp-vu"></div>
                    <span>{"R"}</span>
                    <div className="xp-vu" style={{ animationDelay: "-.3s" }}></div>
                  </div>{" "}
                </div>{" "}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {" "}
                  <button type="button" className="xp-btn" onClick={v.dprev} aria-label="Casete anterior">
                    {"◀◀"}
                  </button>{" "}
                  <button type="button" className="xp-btn xp-btn-play" aria-label="Reproduciendo">
                    {"▶"}
                  </button>{" "}
                  <button type="button" className="xp-btn" onClick={v.dnext} aria-label="Siguiente casete">
                    {"▶▶"}
                  </button>{" "}
                  <span
                    style={{
                      marginLeft: "auto",
                      alignSelf: "center",
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "8px",
                      color: "#8f80b8",
                    }}
                  >
                    {"DOLBY · AUTO-REVERSE"}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* lista de canciones del casete */}{" "}
            <div
              style={{ position: "relative", marginTop: "26px", paddingTop: "22px", borderTop: "1px dashed #4b3a78" }}
            >
              {" "}
              <h3
                style={{
                  margin: "0 0 6px",
                  fontFamily: "'Londrina Solid', sans-serif",
                  fontWeight: "900",
                  fontSize: "32px",
                  lineHeight: "1.1",
                }}
              >
                {v.dcur.role}
                {" · "}
                {v.dcur.company}
              </h3>{" "}
              <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#ff8ad8" }}>{v.dcur.stack}</p>{" "}
              <ol style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gap: "10px" }}>
                {" "}
                {v.dlist.map((b, _i) => (
                  <Fragment key={_i}>
                    {" "}
                    <li
                      style={{
                        display: "grid",
                        gridTemplateColumns: "56px 1fr",
                        gap: "12px",
                        alignItems: "baseline",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#e6d9fb",
                      }}
                    >
                      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#3ff0ff" }}>
                        {b.n}
                      </span>
                      <span>{b.t}</span>
                    </li>{" "}
                  </Fragment>
                ))}{" "}
              </ol>{" "}
            </div>{" "}
          </div>{" "}
          {/* estante */}{" "}
          <p
            style={{
              margin: "56px 0 18px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              color: "#fff27a",
            }}
          >
            {"ESTANTE · 4 CASETES"}
          </p>{" "}
          <div className="xp-shelf">
            {" "}
            {v.dsel0 && (
              <>
                <button type="button" className="xp-tapebtn xp-on" onClick={v.dpick0} aria-pressed="true">
                  <img src="/assets/cassette-upnify.webp" alt="" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#ff2fb3" }}>
                    {"2024 · UPNIFY"}
                  </span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#fff27a" }}>
                    {"▶ EN EL DECK"}
                  </span>
                </button>
              </>
            )}{" "}
            {v.didle0 && (
              <>
                <button type="button" className="xp-tapebtn" onClick={v.dpick0} aria-pressed="false">
                  <img src="/assets/cassette-upnify.webp" alt="" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#ff2fb3" }}>
                    {"2024 · UPNIFY"}
                  </span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#8f80b8" }}>
                    {"CARGAR"}
                  </span>
                </button>
              </>
            )}{" "}
            {v.dsel1 && (
              <>
                <button type="button" className="xp-tapebtn xp-on" onClick={v.dpick1} aria-pressed="true">
                  <img src="/assets/cassette-upqroo.webp" alt="" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#3ff0ff" }}>
                    {"2023 · UPQROO"}
                  </span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#fff27a" }}>
                    {"▶ EN EL DECK"}
                  </span>
                </button>
              </>
            )}{" "}
            {v.didle1 && (
              <>
                <button type="button" className="xp-tapebtn" onClick={v.dpick1} aria-pressed="false">
                  <img src="/assets/cassette-upqroo.webp" alt="" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#3ff0ff" }}>
                    {"2023 · UPQROO"}
                  </span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#8f80b8" }}>
                    {"CARGAR"}
                  </span>
                </button>
              </>
            )}{" "}
            {v.dsel2 && (
              <>
                <button type="button" className="xp-tapebtn xp-on" onClick={v.dpick2} aria-pressed="true">
                  <img src="/assets/cassette-hiplot.webp" alt="" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#fff27a" }}>
                    {"2021 · HIPLOT"}
                  </span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#fff27a" }}>
                    {"▶ EN EL DECK"}
                  </span>
                </button>
              </>
            )}{" "}
            {v.didle2 && (
              <>
                <button type="button" className="xp-tapebtn" onClick={v.dpick2} aria-pressed="false">
                  <img src="/assets/cassette-hiplot.webp" alt="" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#fff27a" }}>
                    {"2021 · HIPLOT"}
                  </span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#8f80b8" }}>
                    {"CARGAR"}
                  </span>
                </button>
              </>
            )}{" "}
            {v.dsel3 && (
              <>
                <button type="button" className="xp-tapebtn xp-on" onClick={v.dpick3} aria-pressed="true">
                  <img src="/assets/cassette-freelance.webp" alt="" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#b26bff" }}>
                    {"2020 · FREELANCE"}
                  </span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#fff27a" }}>
                    {"▶ EN EL DECK"}
                  </span>
                </button>
              </>
            )}{" "}
            {v.didle3 && (
              <>
                <button type="button" className="xp-tapebtn" onClick={v.dpick3} aria-pressed="false">
                  <img src="/assets/cassette-freelance.webp" alt="" />
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#b26bff" }}>
                    {"2020 · FREELANCE"}
                  </span>
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#8f80b8" }}>
                    {"CARGAR"}
                  </span>
                </button>
              </>
            )}{" "}
          </div>{" "}
        </div>{" "}
        {/* ciudad lejana al atardecer (ilustración en capas) + grid */}{" "}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "1",
            left: "0",
            right: "0",
            bottom: "0",
            height: "600px",
            pointerEvents: "none",
          }}
        >
          {" "}
          <div
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "60px",
              height: "460px",
              background:
                "radial-gradient(ellipse 62% 75% at 50% 100%, rgba(255,94,126,.42), rgba(176,24,110,.24) 45%, transparent 75%)",
            }}
          ></div>{" "}
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "140px",
              width: "400px",
              height: "400px",
              translate: "-50% 0",
              filter: "drop-shadow(0 0 60px rgba(255,94,126,.6))",
            }}
          >
            {" "}
            <div
              className="rw-hsun"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "linear-gradient(180deg, #fff27a 0%, #ffb347 35%, #ff5e7e 65%, #ff2fb3 100%)",
              }}
            ></div>{" "}
          </div>{" "}
          <svg
            viewBox="0 0 1440 380"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: "absolute", left: "0", right: "0", bottom: "88px", width: "100%", height: "380px" }}
          >
            {" "}
            <defs>
              <linearGradient id="rwHaze" x1="0" y1="0" x2="0" y2="1">
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
            <rect x="0" y="220" width="1440" height="160" fill="url(#rwHaze)"></rect>{" "}
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
          <svg
            className="rw-hide-sm"
            viewBox="0 0 220 420"
            style={{
              position: "absolute",
              left: "max(0%, calc(50% - 740px))",
              bottom: "84px",
              width: "240px",
              height: "460px",
            }}
          >
            {" "}
            <path
              d="M120 420 C118 330 110 250 92 150"
              stroke="#0a0118"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            ></path>{" "}
            <g stroke="#0a0118" strokeWidth="7" fill="none" strokeLinecap="round">
              <path d="M92 150 C60 120 30 125 4 150"></path>
              <path d="M92 150 C70 100 40 90 14 96"></path>
              <path d="M92 150 C96 100 120 80 150 76"></path>
              <path d="M92 150 C130 120 170 128 200 156"></path>
              <path d="M92 150 C120 150 150 175 162 210"></path>
              <path d="M92 150 C64 160 44 190 40 224"></path>
            </g>{" "}
          </svg>{" "}
          <svg
            className="rw-hide-sm"
            viewBox="0 0 220 420"
            style={{
              position: "absolute",
              right: "max(0%, calc(50% - 740px))",
              bottom: "84px",
              width: "200px",
              height: "380px",
              transform: "scaleX(-1)",
            }}
          >
            {" "}
            <path
              d="M120 420 C118 330 110 250 92 150"
              stroke="#0a0118"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            ></path>{" "}
            <g stroke="#0a0118" strokeWidth="7" fill="none" strokeLinecap="round">
              <path d="M92 150 C60 120 30 125 4 150"></path>
              <path d="M92 150 C70 100 40 90 14 96"></path>
              <path d="M92 150 C96 100 120 80 150 76"></path>
              <path d="M92 150 C130 120 170 128 200 156"></path>
              <path d="M92 150 C120 150 150 175 162 210"></path>
              <path d="M92 150 C64 160 44 190 40 224"></path>
            </g>{" "}
          </svg>{" "}
          <div
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "0",
              height: "92px",
              overflow: "hidden",
              borderTop: "2px solid #ff2fb3",
              boxShadow: "0 -6px 30px rgba(255,47,179,.6)",
              background: "#12021f",
              perspective: "260px",
            }}
          >
            {" "}
            <div className="rw-about-floor"></div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </>
  );
}
