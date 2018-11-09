import iSlider from "../iSlider.js";
import styles from "./index.less";
import classNames from "classnames";
import { connect } from "dva";
import React from "react";
import router from 'umi/router';
import {Link} from "react-router-dom";

//className={classNames(styles.box,styles.item_1)}
//className={styles.}

class SliderLayout extends React.PureComponent {
  componentDidMount() {
    let myslider = new iSlider({
      wrap: "#wrap",
      item: "." + styles.item,
      playClass: styles.play,
      onslide: function(index) {
        if (index === 7) {
          document.getElementById("J_joinNum").innerHTML = parseInt(
            Math.random() * 10000,
            10
          );
        }
      }
    });
    this.myslider = myslider;
  }

  buttonClick() {
    if (this.myslider) {
      this.myslider.next();
    }
  }

  skip() {
    router.push('/website');
  }

  render() {
    return (
      <div className={styles.bodybox}>
        <div className={styles.wrap} id="wrap">
          <div className={classNames(styles.item, styles.item_1)}>
            <div className={styles.box}>
              <h1 className={styles.hide}>有人说，我们终将成为自己讨厌的人</h1>
              <div className={styles.mod_container}>
                <p className={classNames(styles.sprite, styles.text_1)} />
                <p className={classNames(styles.sprite, styles.text_2)} />
                <div className={classNames(styles.sprite, styles.scene)} />
                <div
                  className={classNames(styles.sprite_global, styles.text_3)}
                />
                <div
                  className={classNames(styles.sprite_global, styles.text_4)}
                />
                <div
                  className={classNames(styles.sprite_global, styles.text_5)}
                />
              </div>
            </div>
          </div>

          <div className={classNames(styles.item, styles.item_2)}>
            <div className={styles.box}>
              <h1 className={styles.hide}>那么,我们喜欢什么样的自己呢? </h1>
              <div className={styles.mod_container}>
                <p className={classNames(styles.sprite, styles.text_1)} />
                <p className={classNames(styles.sprite, styles.text_2)} />
                <div className={classNames(styles.sprite, styles.scene)} />
              </div>
            </div>
          </div>

          <div className={classNames(styles.item, styles.item_3)}>
            <div className={styles.box}>
              <h1 className={styles.hide}>
                我喜欢，每一天，目标明确，充满干劲{" "}
              </h1>
              <div className={styles.mod_container}>
                <p className={classNames(styles.sprite, styles.text_1)} />
                <p className={classNames(styles.sprite, styles.text_2)} />
                <div className={classNames(styles.sprite, styles.scene)} />
              </div>
            </div>
          </div>

          <div className={classNames(styles.item, styles.item_4)}>
            <div className={styles.box}>
              <h1 className={styles.hide}>我希望，每天都比前一天要优秀</h1>
              <div className={styles.mod_container}>
                <p className={classNames(styles.sprite, styles.text_1)} />
                <p className={classNames(styles.sprite, styles.text_2)} />
                <div className={classNames(styles.sprite, styles.scene)}>
                  <i className={styles.sprite_global} />
                  <i className={styles.sprite_global} />
                  <i className={styles.sprite_global} />
                </div>
              </div>
            </div>
          </div>

          <div className={classNames(styles.item, styles.item_5)}>
            <div className={styles.box}>
              <h1 className={styles.hide}>
                我愿意，每一天，脚踏实地，一步一个脚印{" "}
              </h1>
              <div className={styles.mod_container}>
                <p className={classNames(styles.sprite, styles.text_1)} />
                <p className={classNames(styles.sprite, styles.text_2)} />
                <div className={classNames(styles.sprite, styles.scene)}>
                  <i
                    className={classNames(
                      styles.icon_zone,
                      styles.sprite_global
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classNames(styles.item, styles.item_6)}>
            <div className={styles.box}>
              <h1 className={styles.hide}>
                让我们，保持独立思考，不卑不亢，长成自己想要的样子!{" "}
              </h1>
              <div className={styles.mod_container}>
                <p className={classNames(styles.sprite, styles.text_1)} />
                <p className={classNames(styles.sprite, styles.text_2)} />
                <div className={classNames(styles.sprite, styles.scene)} />
                <Link className={styles.btn_open_vip} to='/website'>          
                  进入主页
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 上滑控件  */}
        <div>
          <div className={styles.slider}>
            <span
              className={styles.sprite_global}
              onClick={() => this.buttonClick()}
            />
          </div>
        </div>
        {/* skip控件  */}
        <div>
          <div className={styles.skip}>
            <span
              className={styles.sprite_global}
              onClick={() => this.skip()}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(state => {
  return {};
})(SliderLayout);
