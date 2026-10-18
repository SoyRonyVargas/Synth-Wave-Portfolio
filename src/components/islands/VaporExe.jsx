import { useState, Fragment } from "react";
import PROYS from "../../data/projects.json";

export default function VaporExe() {
  const [pi, setPi] = useState(0);
  const v = { pcur: PROYS[pi] };
  for (let k = 0; k < PROYS.length; k++) {
    v["pon" + k] = pi === k;
    v["poff" + k] = pi !== k;
    v["ppick" + k] = () => setPi(k);
  }
  return (
    <>
      {/* PROYECTOS: Vapor.exe (escritorio vaporwave con modelos 3D) */}{" "}
      <section
        id="proyectos"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "repeating-linear-gradient(90deg, #160733 0 60px, #1a0838 60px 120px)",
        }}
      >
        {" "}
        <div
          className="rw-stars-static"
          aria-hidden="true"
          style={{ position: "absolute", inset: "0 0 55% 0", opacity: ".6" }}
        ></div>{" "}
        <div
          style={{
            position: "relative",
            zIndex: "2",
            maxWidth: "1260px",
            margin: "0 auto",
            padding: "90px 24px 120px",
          }}
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
              {"04 · C:\\RONY\\PROYECTOS"}
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
                  {"PROYECTOS"}
                </span>
                <span className="rw-chrome">{"PROYECTOS"}</span>
              </span>{" "}
              <span
                className="rw-script"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "58%",
                  bottom: "-34px",
                  whiteSpace: "nowrap",
                  fontSize: "clamp(34px, 4vw, 58px)",
                  transform: "rotate(-7deg)",
                  color: "#ff2fb3",
                  WebkitTextStroke: "1px #ffe6f7",
                  textShadow: "0 0 6px #ff2fb3, 0 0 18px #ff2fb3",
                }}
              >
                {"vapor.exe"}
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
                "Un escritorio vaporwave: cada carpeta abre un proyecto, el CV está a un clic y la última ventana es una invitación."
              }
            </p>{" "}
          </div>{" "}
          <div className="pc-desk">
            {" "}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "0",
                background: "linear-gradient(180deg, #0b0420 0%, #22104a 36%, #6a1b7a 58%, #ff5e9e 69%, #12021f 69.2%)",
              }}
            ></div>{" "}
            <div
              className="rw-stars-static"
              aria-hidden="true"
              style={{ position: "absolute", inset: "0 0 50% 0" }}
            ></div>{" "}
            <div
              className=""
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "calc(50% + 168px)",
                top: "120px",
                marginLeft: "-190px",
                width: "380px",
                height: "380px",
              }}
            >
              <div
                className="rw-hsun"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "linear-gradient(180deg, #fff27a 0%, #ffb347 35%, #ff5e7e 65%, #ff2fb3 100%)",
                  boxShadow: "0 0 30px rgba(255,94,126,.5)",
                }}
              ></div>
            </div>{" "}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                bottom: "0",
                height: "31%",
                overflow: "hidden",
                borderTop: "2px solid #ff2fb3",
                background: "#12021f",
                perspective: "200px",
                perspectiveOrigin: "50% 0",
              }}
            >
              <div className="rw-about-floor"></div>
            </div>{" "}
            <div
              className="pc-3d pc-shadow"
              aria-hidden="true"
              style={{ left: "calc(50% + 74px)", top: "548px", width: "190px", height: "34px", zIndex: "1" }}
            ></div>{" "}
            <img
              className="pc-3d pc-bust"
              src="/assets/bust.webp"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                zIndex: "1",
                left: "calc(50% + 66px)",
                top: "226px",
                width: "206px",
                height: "auto",
              }}
            />{" "}
            <span
              className="pc-3d pc-splash"
              aria-hidden="true"
              style={{ left: "528px", top: "618px", zIndex: "2" }}
            ></span>{" "}
            <span
              className="pc-3d pc-splash pc-splash2"
              aria-hidden="true"
              style={{ left: "1040px", top: "618px", zIndex: "2" }}
            ></span>{" "}
            <div className="pc-3d pc-leap" aria-hidden="true" style={{ left: "470px", top: "520px", zIndex: "0" }}>
              <div className="pc-dolf"></div>
            </div>{" "}
            <div
              className="pc-icons"
              style={{
                position: "absolute",
                left: "16px",
                top: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                zIndex: "2",
              }}
            >
              {" "}
              <a className="pc-ico" href="/Rony_Vargas_CV_2026.pdf" download="Rony_Vargas_CV.pdf">
                <img
                  src="/assets/floppy-cv.webp"
                  alt=""
                  aria-hidden="true"
                  style={{ width: "58px", height: "auto", filter: "drop-shadow(0 0 6px rgba(255,47,179,.6))" }}
                />
                {"CV_Rony.pdf"}
              </a>{" "}
              <a className="pc-ico" href="#contacto">
                <img
                  src="/assets/envelope.webp"
                  alt=""
                  aria-hidden="true"
                  style={{ width: "66px", height: "auto", filter: "drop-shadow(0 0 6px rgba(63,240,255,.55))" }}
                />
                {"contacto.txt"}
              </a>{" "}
            </div>{" "}
            <section
              className="pc-win"
              aria-label="Ventana de proyectos"
              style={{ left: "118px", top: "24px", width: "548px", zIndex: "3", border: "2px solid #ff2fb3" }}
            >
              {" "}
              <div className="pc-bar" style={{ background: "linear-gradient(90deg, #ff2fb3, #b26bff)" }}>
                <span>{"C:\\RONY\\proyectos.exe"}</span>
                <span aria-hidden="true">
                  <i>{"_"}</i>
                  <i>{"□"}</i>
                  <i>{"✕"}</i>
                </span>
              </div>{" "}
              <div
                className="pc-grid"
                style={{ display: "grid", gridTemplateColumns: "206px 1fr", minHeight: "300px" }}
              >
                {" "}
                <div
                  style={{
                    padding: "10px",
                    borderRight: "2px solid rgba(255,47,179,.35)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {v.pon0 && (
                    <>
                      <button
                        className="pc-file"
                        onClick={v.ppick0}
                        style={{ borderColor: "#ff2fb3", background: "rgba(255,47,179,.16)" }}
                      >
                        <img
                          src="/assets/folder-crm-open.webp"
                          alt=""
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "46px",
                            height: "auto",
                            filter: "drop-shadow(0 0 6px rgba(255,47,179,.6))",
                          }}
                        />
                        <span style={{ minWidth: "0" }}>
                          {"01_crm_upnify"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#9d8cc4" }}>{"2024–2026"}</span>
                        </span>
                      </button>
                    </>
                  )}
                  {v.poff0 && (
                    <>
                      <button className="pc-file" onClick={v.ppick0}>
                        <img
                          src="/assets/folder-crm.webp"
                          alt=""
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "46px",
                            height: "auto",
                            filter: "drop-shadow(0 0 6px rgba(255,47,179,.6))",
                          }}
                        />
                        <span style={{ minWidth: "0" }}>
                          {"01_crm_upnify"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#9d8cc4" }}>{"2024–2026"}</span>
                        </span>
                      </button>
                    </>
                  )}
                  {v.pon1 && (
                    <>
                      <button
                        className="pc-file"
                        onClick={v.ppick1}
                        style={{ borderColor: "#3ff0ff", background: "rgba(63,240,255,.16)" }}
                      >
                        <img
                          src="/assets/folder-qroo-open.webp"
                          alt=""
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "46px",
                            height: "auto",
                            filter: "drop-shadow(0 0 6px rgba(63,240,255,.6))",
                          }}
                        />
                        <span style={{ minWidth: "0" }}>
                          {"02_oferta_qroo"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#9d8cc4" }}>{"2023"}</span>
                        </span>
                      </button>
                    </>
                  )}
                  {v.poff1 && (
                    <>
                      <button className="pc-file" onClick={v.ppick1}>
                        <img
                          src="/assets/folder-qroo.webp"
                          alt=""
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "46px",
                            height: "auto",
                            filter: "drop-shadow(0 0 6px rgba(63,240,255,.6))",
                          }}
                        />
                        <span style={{ minWidth: "0" }}>
                          {"02_oferta_qroo"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#9d8cc4" }}>{"2023"}</span>
                        </span>
                      </button>
                    </>
                  )}
                  {v.pon2 && (
                    <>
                      <button
                        className="pc-file"
                        onClick={v.ppick2}
                        style={{ borderColor: "#fff27a", background: "rgba(255,242,122,.16)" }}
                      >
                        <img
                          src="/assets/folder-editor-open.webp"
                          alt=""
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "46px",
                            height: "auto",
                            filter: "drop-shadow(0 0 6px rgba(255,242,122,.6))",
                          }}
                        />
                        <span style={{ minWidth: "0" }}>
                          {"03_editor_hiplot"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#9d8cc4" }}>{"2021–2022"}</span>
                        </span>
                      </button>
                    </>
                  )}
                  {v.poff2 && (
                    <>
                      <button className="pc-file" onClick={v.ppick2}>
                        <img
                          src="/assets/folder-editor.webp"
                          alt=""
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "46px",
                            height: "auto",
                            filter: "drop-shadow(0 0 6px rgba(255,242,122,.6))",
                          }}
                        />
                        <span style={{ minWidth: "0" }}>
                          {"03_editor_hiplot"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#9d8cc4" }}>{"2021–2022"}</span>
                        </span>
                      </button>
                    </>
                  )}
                  {v.pon3 && (
                    <>
                      <button
                        className="pc-file"
                        onClick={v.ppick3}
                        style={{ borderColor: "#b26bff", background: "rgba(178,107,255,.16)" }}
                      >
                        <img
                          src="/assets/folder-portfolio-open.webp"
                          alt=""
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "46px",
                            height: "auto",
                            filter: "drop-shadow(0 0 6px rgba(178,107,255,.6))",
                          }}
                        />
                        <span style={{ minWidth: "0" }}>
                          {"04_portafolio"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#9d8cc4" }}>{"Personal"}</span>
                        </span>
                      </button>
                    </>
                  )}
                  {v.poff3 && (
                    <>
                      <button className="pc-file" onClick={v.ppick3}>
                        <img
                          src="/assets/folder-portfolio.webp"
                          alt=""
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "46px",
                            height: "auto",
                            filter: "drop-shadow(0 0 6px rgba(178,107,255,.6))",
                          }}
                        />
                        <span style={{ minWidth: "0" }}>
                          {"04_portafolio"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#9d8cc4" }}>{"Personal"}</span>
                        </span>
                      </button>
                    </>
                  )}
                </div>{" "}
                <div
                  className="rw-tv-on"
                  style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}
                >
                  {" "}
                  <p
                    style={{
                      margin: "0",
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "8px",
                      color: "#7dffcf",
                    }}
                  >
                    {"PROPIEDADES · "}
                    {v.pcur.client}
                  </p>{" "}
                  <h3
                    style={{
                      margin: "0",
                      fontFamily: "'Londrina Solid', sans-serif",
                      fontWeight: "900",
                      fontSize: "30px",
                      lineHeight: "1.05",
                      color: "#fff",
                      textShadow: "0 0 12px rgba(255,47,179,.6)",
                    }}
                  >
                    {v.pcur.title}
                  </h3>{" "}
                  <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.55", color: "#e6d9fb" }}>{v.pcur.desc}</p>{" "}
                  <p
                    style={{
                      margin: "auto 0 0",
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "8px",
                      lineHeight: "1.8",
                      color: "#ff8ad8",
                    }}
                  >
                    {v.pcur.stack}
                  </p>{" "}
                  {v.pcur.hasLink && (
                    <>
                      <a className="pc-btn" href={v.pcur.link} style={{ alignSelf: "flex-start" }}>
                        {"▶ ABRIR SITIO"}
                      </a>
                    </>
                  )}{" "}
                </div>{" "}
              </div>{" "}
              <div
                style={{
                  padding: "6px 10px",
                  borderTop: "2px solid rgba(255,47,179,.35)",
                  fontSize: "11px",
                  color: "#9d8cc4",
                }}
              >
                {"4 objetos · 1 seleccionado · "}
                {v.pcur.year}
              </div>{" "}
            </section>{" "}
            <figure
              className="pc-win"
              style={{
                right: "40px",
                top: "44px",
                width: "230px",
                margin: "0",
                zIndex: "2",
                border: "2px solid #3ff0ff",
              }}
            >
              {" "}
              <div
                className="pc-bar"
                style={{ background: "linear-gradient(90deg, #3ff0ff, #b26bff)", color: "#0b0420" }}
              >
                <span>{"fondo_rv.png"}</span>
                <span aria-hidden="true">
                  <i style={{ borderColor: "#0b0420" }}>{"_"}</i>
                  <i style={{ borderColor: "#0b0420" }}>{"✕"}</i>
                </span>
              </div>{" "}
              <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", background: "#22104a" }}>
                {" "}
                <img
                  src="/assets/fondo-rv.webp"
                  alt="Ilustración estilo anime: dos personas con casco de moto bajo un cielo morado"
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                />{" "}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "0",
                    pointerEvents: "none",
                    background: "repeating-linear-gradient(rgba(0,0,0,.14) 0 2px, transparent 2px 4px)",
                  }}
                ></div>{" "}
              </div>{" "}
              <figcaption style={{ padding: "6px 10px", fontSize: "11px", color: "#9d8cc4" }}>
                {"fondo_rv.png · 720 × 720"}
              </figcaption>{" "}
            </figure>{" "}
            <div
              className="pc-win pc-back"
              role="presentation"
              aria-hidden="true"
              style={{ left: "30px", top: "404px", width: "360px", zIndex: "4", border: "2px solid #fff27a" }}
            >
              {" "}
              <div className="pc-bar" style={{ background: "linear-gradient(90deg, #b26bff, #ff2fb3)" }}>
                <span>{"⚠ RV-OS"}</span>
                <span aria-hidden="true">
                  <i>{"✕"}</i>
                </span>
              </div>{" "}
              <div style={{ padding: "16px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                {" "}
                <span
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#fff27a",
                    color: "#0b0420",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "16px",
                    lineHeight: "34px",
                    textAlign: "center",
                  }}
                >
                  {"!"}
                </span>{" "}
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "#fff" }}>
                  {"proyecto_05.exe todavía no existe."}
                </p>{" "}
              </div>{" "}
              <div style={{ padding: "0 16px 16px" }}>
                <div aria-hidden="true" style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <span className="pc-btn" style={{ opacity: ".6" }}>
                    {"OK"}
                  </span>
                </div>
              </div>{" "}
            </div>{" "}
            <div
              className="pc-win pc-back"
              role="presentation"
              aria-hidden="true"
              style={{ left: "56px", top: "432px", width: "360px", zIndex: "5", border: "2px solid #fff27a" }}
            >
              {" "}
              <div className="pc-bar" style={{ background: "linear-gradient(90deg, #b26bff, #ff2fb3)" }}>
                <span>{"⚠ RV-OS"}</span>
                <span aria-hidden="true">
                  <i>{"✕"}</i>
                </span>
              </div>{" "}
              <div style={{ padding: "16px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                {" "}
                <span
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#fff27a",
                    color: "#0b0420",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "16px",
                    lineHeight: "34px",
                    textAlign: "center",
                  }}
                >
                  {"!"}
                </span>{" "}
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "#fff" }}>
                  {"Memoria llena de ideas."}
                </p>{" "}
              </div>{" "}
              <div style={{ padding: "0 16px 16px" }}>
                <div aria-hidden="true" style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <span className="pc-btn" style={{ opacity: ".6" }}>
                    {"OK"}
                  </span>
                </div>
              </div>{" "}
            </div>{" "}
            <div
              className="pc-win"
              role="dialog"
              aria-label="Mensaje de RV-OS"
              style={{ left: "82px", top: "460px", width: "360px", zIndex: "6", border: "2px solid #fff27a" }}
            >
              {" "}
              <div className="pc-bar" style={{ background: "linear-gradient(90deg, #b26bff, #ff2fb3)" }}>
                <span>{"⚠ RV-OS"}</span>
                <span aria-hidden="true">
                  <i>{"✕"}</i>
                </span>
              </div>{" "}
              <div style={{ padding: "16px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                {" "}
                <span
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#fff27a",
                    color: "#0b0420",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "16px",
                    lineHeight: "34px",
                    textAlign: "center",
                  }}
                >
                  {"!"}
                </span>{" "}
                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "#fff" }}>
                  {"¿Hacemos juntos el proyecto 05? Escríbeme y lo arrancamos."}
                </p>{" "}
              </div>{" "}
              <div style={{ padding: "0 16px 16px" }}>
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <a className="pc-btn" href="#contacto">
                    {"SÍ"}
                  </a>
                  <a className="pc-btn" href="#contacto">
                    {"¡CLARO!"}
                  </a>
                </div>
              </div>{" "}
            </div>{" "}
            <div
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                bottom: "0",
                zIndex: "7",
                height: "44px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 8px",
                background: "#0b0420",
                borderTop: "2px solid #ff2fb3",
              }}
            >
              {" "}
              <span
                style={{
                  padding: "8px 10px",
                  borderRadius: "4px",
                  background: "linear-gradient(90deg, #ff2fb3, #b26bff)",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "8px",
                  color: "#fff",
                }}
              >
                {"RV ▶ INICIO"}
              </span>{" "}
              <span
                className="rw-hide-sm"
                style={{
                  padding: "7px 10px",
                  border: "1.5px solid rgba(255,47,179,.7)",
                  borderRadius: "4px",
                  fontSize: "11px",
                  color: "#fff",
                }}
              >
                {"proyectos.exe"}
              </span>{" "}
              <span
                className="rw-hide-sm"
                style={{
                  padding: "7px 10px",
                  border: "1.5px solid rgba(63,240,255,.6)",
                  borderRadius: "4px",
                  fontSize: "11px",
                  color: "#c9f7ff",
                }}
              >
                {"fondo_rv.png"}
              </span>{" "}
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "8px",
                  color: "#7dffcf",
                }}
              >
                {"ES · 23:11"}
              </span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </>
  );
}
