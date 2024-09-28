import React, { useState } from "react";
import { SliderPicker } from "react-color";
import "react-color-palette/css";
import style from "./ColorPicker.module.scss"; // Assuming you're using CSS Modules
import CloseIcon from "../../../assets/svgs/signupModal/closeIcon";
import { memo } from "react";
const colors = [
    [
        "#EACEC5",
        "#FEB99A",
        "#FA3E31",
        "#E5573F",
        "#A8616A",
        "#BC6352",
        "#F7D755",
        "#FFF700",
        "#B78300",
    ],
    [
        "#E0B1A9",
        "#ECC5C3",
        "#FD6E60",
        "#7C3D2B",
        "#DFAAAB",
        "#CCA96E",
        "#D19B80",
        "#F0B216",
        "#F7DE00",
        "#91776C",
    ],
    [
        "#FBEFEB",
        "#DED2C3",
        "#CD393A",
        "#B8793E",
        "#D35C85",
        "#D897A0",
        "#F39983",
        "#EBCFB8",
        "#FFF886",
    ],
    [
        "#D46E6C",
        "#FFD0AE",
        "#FF4275",
        "#A81902",
        "#F1AC7E",
        "#E8CA70",
        "#FF9110",
        "#EECE7C",
        "#F4EBDD",
        "#677659",
    ],
    [
        "#FBDFD9",
        "#EFB5A1",
        "#F6642B",
        "#FF9247",
        "#D9855E",
        "#F1B314",
        "#EAD226",
        "#E3DAC0",
        "#F7E3C3",
    ],
    [
        "#DFDAC2",
        "#BAD1C1",
        "#43A42E",
        "#55AEA3",
        "#78B8AD",
        "#70BAD1",
        "#A0FBFE",
        "#73BDF8",
        "#B7C0DC",
        "#FF5FAD",
    ],
    [
        "#ABA77C",
        "#2DD29B",
        "#A3DABC",
        "#B3CCAD",
        "#2B63D2",
        "#008BD2",
        "#9FC1DB",
        "#CCBAC7",
        "#DB829D",
    ],
    [
        "#B1BBAF",
        "#9CC4C8",
        "#48A77E",
        "#DCFFE1",
        "#96ACA7",
        "#A4E9EE",
        "#8599C5",
        "#465FEB",
        "#DACFEE",
        "#B984AA",
    ],
    [
        "#ADAFAC",
        "#B4C97C",
        "#55B794",
        "#01584E",
        "#2DA0D2",
        "#9DB8FF",
        "#C4D5FF",
        "#C8B4E6",
        "#FB99B9",
    ],
    [
        "#CCE3FF",
        "#D0D5D2",
        "#76AAB0",
        "#33887E",
        "#2A2F8D",
        "#6A95BB",
        "#9EACE8",
        "#79A7DB",
        "#BE96D9",
        "#F4E0FF",
    ],
    [
        "#000000",
        "#383838",
        "#797979",
        "#999999",
        "#B8B8B8",
        "#D7D7D7",
        "#ECECEC",
        "#FFFFFF",
        "",
    ],
];

const ColorPicker = ({
    colorValue,
    setBrandClr,
    setShowColorPicker,
    setClrSelected,
}) => {
    const [colorPickerValue, setcolorPickerValue] = useState(colorValue);

    const onChangeValue = (type, hex) => {
        if (type === "colors") {
            setcolorPickerValue(hex);
            return;
        } else if (type === "slider") {
            setcolorPickerValue(hex?.hex);
        } else if (type === "input") {
            setcolorPickerValue(hex);
        }
    };

    return (
        <div className={style.colorModal}>
            <div className={style.headerBody}>
                <div className={style.titleDiv}>
                    <h1>Choose Accent Colour</h1>
                </div>
                <div
                    onClick={() => {
                        setClrSelected(true);
                        setShowColorPicker(false);
                    }}
                    className={style.closeDiv}
                >
                    <span>
                        <CloseIcon />
                    </span>
                </div>
            </div>

            <div className={style.colors}>
                {colors.map((colorRow, key) => (
                    <div
                        key={key}
                        className={style.colorColumn}
                        style={{
                            marginTop: key % 2 === 0 ? "0" : "-10px",
                        }}
                    >
                        {colorRow.map((color, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: color,
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                className={
                                    colorPickerValue === color
                                        ? style.active
                                        : ""
                                }
                                onClick={() => onChangeValue("colors", color)}
                            >
                                {color === "" ? (
                                    <b className={style.noColor}></b>
                                ) : null}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            <div className={style.sliderColorDiv}>
                <SliderPicker
                    color={colorPickerValue}
                    onChange={(e) => onChangeValue("slider", e)}
                />
            </div>

            <div className={style.orDiv}>
                <div className={style.line}></div>
                <p>OR</p>
                <div className={style.line}></div>
            </div>

            <div className={style.colorInputDiv}>
                <span
                    style={{
                        backgroundColor: `${colorPickerValue}`,
                    }}
                    className={style.colorDiv}
                ></span>
                <input
                    type="text"
                    value={colorPickerValue}
                    onChange={(e) => onChangeValue("input", e.target.value)}
                    placeholder="Enter color code"
                />
            </div>

            <div className={style.buttonDiv}>
                <button
                    onClick={() => {
                        setBrandClr(colorPickerValue);
                        setClrSelected(true);
                        setShowColorPicker(false);
                    }}
                >
                    Choose Colour
                </button>
            </div>
        </div>
    );
};

export default memo(ColorPicker);
