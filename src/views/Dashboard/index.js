import React, { useState } from "react";
import PannelHead from "../../components/PanelHead/PanelHead";
import styles from "./Dashboard.module.scss";
import { Tabs, Tab } from "../../components/Tabs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../constants/Modal";
import scanner from "../../assets/images/document_scanner.svg";
import cancel from "../../assets/images/cancel.svg";
import expand from "../../assets/images/expand_more.svg";
import emoji from "../../assets/images/emoji_events.svg";
import camera from "../../assets/images/camera.svg";
import scan from "../../assets/images/scan_barcode.svg";
import Frame from "../../assets/images/Frame.svg";
import Mobile from "./Mobile";
import { useMediaQuery } from "react-responsive";
import Button from "../../constants/Button";
import InputField from "../../constants/Input/index";
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPreModal, setShowPreModal] = useState(false);
  const [ScanTicket, setScanTicket] = useState(false);
  const [ScanCode, setScanCode] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 468px)" });

  const handleCloseToast = () => {
    setShowModal(false);
    toast.success("Successfully canceled bet", {
      position: toast.POSITION.TOP_RIGHT
    });
  

  
  }
  const handleCancelBet = () => {
    setShowModal(false);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleOpenCreateBet = (e) => {
    e.preventDefault();
  };

  // const handleOpenPreBet = (e) => {
  //   e.preventDefault();
  //   setShowPreModal(true);
  // };

  const handleClosePreBet = () => {
    setShowPreModal(false);
 
  
  };

  return (
    <div className={styles.Dashboard}>
      <PannelHead />

      {isMobile ? (
        <Mobile />
      ) : (
        <Tabs>
          <Tab
            label="Create new bet"
            icon={scanner}
            expandIcon={expand}
            setScanTicket={setScanTicket}
            dontshow={true}

          >
            {ScanTicket ? (
              ScanCode ? (
                <>
                  <img src={scan} />
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      marginTop: "12px",
                    }}
                  >
                    <img src={Frame} /> Put the barcode on the center of the
                    camera
                  </p>
                </>
              ) : (
                <form
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "24px",
                  }}
                  className={styles.BetForm}
                >
                  <img src={camera} />
                  <p>
                    To scan the tickets you must allow the website to use your
                    camera{" "}
                  </p>
                  <Button
                    style={{ margin: "12px 0 0 0 " }}
                    // className={styles.BetFormSubmit}
                    text="Ok, continue"
                    onClick={() => setScanCode(!ScanCode)}
                  />
                </form>
              )
            ) : (
              <form className={styles.BetForm}>
                <InputField style={{width: '400px'}} type="text" placeholder="Ticket Code" />
                <Button
                  style={{ width: "148px" }}
                  text="Create"
                  onClick={handleOpenCreateBet}
                />
              </form>
            )}
          </Tab>
          <Tab
            label="Cancel bet"
            icon={cancel}
            setScanTicket={setScanTicket}
            expandIcon={expand}
            dontshow={false}
          >
            <form className={styles.BetForm}>
              <InputField  style={{width: '400px'}}  placeholder="Label" type="text" />
              <Button
                style={{ width: "148px" }}
                text="Cancel"
                onClick={handleOpen}
              />
            </form>
          </Tab>
          <Tab
            label="Premium payment"
            setScanTicket={setScanTicket}
            icon={emoji}
          >
            {ScanCode ? (
              <>
                <img src={scan} style={{ maxWidth: "100%", margin: '32px 0 27px 0' }} />
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '28px',
                    color: '#49454F'

                  }}
                >
                  <img src={Frame} /> Put the barcode on the center of the
                  camera
                </p>
              </>
            ) : (
              <form
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px",
                }}
                className={styles.BetForm}
              >
                <img src={camera} />
                <p>
                  To scan the tickets you must allow the website to use your
                  camera{" "}
                </p>
                <Button
                  // className={styles.BetFormSubmit}
                  style={{marginTop: '10px'}}
                  text="Ok, continue"
                  onClick={() => setScanCode(!ScanCode)}
                />
              </form>
            )}
          </Tab>
        </Tabs>
      )}

      <Modal size="mediumSmall" show={showModal} handleClose={handleCancelBet}>
        <h4>Cancel bet</h4>
        <p className={styles.ModalContent}>
          Are you sure you want to cancel the bet?
        </p>
        <div className={styles.ButtonWrap}>
          <Button
            style={{
              width: "148px",
              margin: "4px 0 0 auto",
              height: "auto",
              padding: "13px",
            }}
            className={styles.ModalButton}
            text="No, go back"
            onClick={handleCancelBet}
          />
          <Button
            style={{
              width: "148px",
              margin: "4px 0 0 auto",
              height: "auto",
              padding: "13px",
            }}
            onClick={handleCloseToast}
            text="Yes, cancel"
          />
        </div>
      </Modal>
      <Modal show={showPreModal} handleClose={handleClosePreBet}>
        <div className={styles.ModalBox}></div>
        <p>
          To collect the prize amount, please go to one of our physical stores
        </p>
        <Button text="Ok, understood" onClick={handleClosePreBet} />
      </Modal>
    </div>
  );
};

export default Dashboard;
