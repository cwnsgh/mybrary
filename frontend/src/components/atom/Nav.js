import home from "../../assets/icon/icon_home.png";
import pp from "../../assets/icon/icon_pp.png";
import feed from "../../assets/icon/icon_feed.png";
import search from "../../assets/icon/icon_search.png";
import bell from "../../assets/icon/icon_bell.png";
import setting from "../../assets/icon/icon_setting.png";
import logout from "../../assets/icon/icon_logout.png";
import s from "classnames";
import styles from "./atomstyle/Nav.module.css";
import { useState } from "react";
import useNotificationStore from "../../store/useNotificationStore";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../api/member/Logout";
import useUserStore from "../../store/useUserStore";
import BigModal from "../common/BigModal";
import { login } from "../../api/member/Login";
import toast from "react-hot-toast";
import FeedModal from "../feed/FeedModal";

export default function Nav() {
  const user = useUserStore((state) => state.user);
  const [active, setActive] = useState([true, false, false, false]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = async () => {
    try {
      const res = await login({
        email: user.email,
        password: password,
      });
      if (res.status === "SUCCESS") {
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("tokenTimestamp", Date.now());
        setModalIsOpen(false);
        setPassword("");
        navigate("/account");
      } else {
        throw new Error();
      }
    } catch (e) {
      toast.error("비밀번호를 확인해주세요", {
        position: "top-center",
      });
    }
  };

  const hasNewNotification = useNotificationStore(
    (state) => state.hasNewNotification
  );
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  //이부분 알림왔을때만 트루되게!!
  const { setNewNotification } = useNotificationStore();

  const [alarmModal, setAlarmModal] = useState(false);
  const handleOffAlarm = () => {
    setNewNotification(false, "");
    setAlarmModal(true);
  };

  const handleSetting = () => {
    // navigate("account");
    setModalIsOpen(true);
  };

  const handleLogOut = async () => {
    try {
      //await doLogout(setUser);
      navigate("/join");
      localStorage.clear();
    } catch (e) {
      navigate("/join");
      localStorage.clear();
    }
  };

  return (
    <>
      <div className={s(styles.nav_container)}>
        <div className={s(styles.nav_paper0, styles.nav_paper)}>
          <div className={s(styles.nav_paper1, styles.nav_paper)}>
            <div className={s(styles.nav_paper2, styles.nav_paper)}>
              <div className={s(styles.nav_paper3, styles.nav_paper)}>
                <div
                  className={s(styles.nav_icon)}
                  onClick={() => handleOffAlarm()}
                >
                  <img src={!hasNewNotification ? bell : setting} alt="" />
                </div>
                <div
                  className={s(styles.nav_icon)}
                  onClick={() => handleSetting()}
                >
                  <img src={setting} alt="" />
                </div>
                <div
                  className={s(styles.nav_icon)}
                  onClick={() => handleLogOut()}
                >
                  <img src={logout} alt="" />
                </div>
                <FeedModal
                  isModalOpen={alarmModal}
                  setIsModalOpen={setAlarmModal}
                  width="400px"
                  height="700px"
                  bottom={"-100px"}
                  left={"50px"}
                >
                  <div>
                    여기에 형이 적고싶은거 적어ㅋㅋ 폰트사이즈 알어서 적으셈
                    px로 적으셈
                  </div>
                </FeedModal>
              </div>
            </div>
          </div>
        </div>
        <div className={s(styles.nav_section_container)}>
          <div
            className={s(
              styles.nav_section,
              active[0] ? styles.nav_active : styles.nav_not_active
            )}
            onClick={() => {
              setActive([true, false, false, false]);
              navigate(`mybrary/${user.memberId}`);
            }}
          >
            {active[0] ? <div>마이</div> : <div></div>}
            <div>
              <img src={home} alt="" />
            </div>
          </div>
          <div
            className={s(
              styles.nav_section,
              active[1] ? styles.nav_active : styles.nav_not_active
            )}
            onClick={() => {
              setActive([false, true, false, false]);
              navigate("feed");
            }}
          >
            {active[1] ? <div>피드</div> : <div></div>}
            <div>
              <img src={feed} alt="" />
            </div>
          </div>
          <div
            className={s(
              styles.nav_section,
              active[2] ? styles.nav_active : styles.nav_not_active
            )}
            onClick={() => {
              setActive([false, false, true, false]);
              navigate("paperplane");
            }}
          >
            {active[2] ? <div>피피</div> : <div></div>}
            <div>
              <img src={pp} alt="" />
            </div>
          </div>
          <div
            className={s(
              styles.nav_section,
              active[3] ? styles.nav_active : styles.nav_not_active
            )}
            onClick={() => {
              setActive([false, false, false, true]);
              navigate("search");
            }}
          >
            {active[3] ? <div>검색</div> : <div></div>}
            <div>
              <img src={search} alt="" />
            </div>
          </div>
        </div>
      </div>
      <BigModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        width="400px"
        height="300px"
      >
        <div className={styles.modal}>
          <div className={styles.header}>설정</div>
          <div className={styles.header2}>비밀번호 확인</div>
          <div className={styles.subheader}>
            개인정보보호를 위해 비밀번호를 입력해주세요.
          </div>
          <div className={styles.modalI}>
            <input
              type="password"
              placeholder="비밀번호룰 입력하세요"
              name="password"
              value={password}
              onChange={handleChange}
              className={styles.modalInput}
            />
          </div>
          <div
            onClick={() => handlePasswordCheck()}
            className={styles.modalButton}
          >
            확인
          </div>
        </div>
      </BigModal>
    </>
  );
}
