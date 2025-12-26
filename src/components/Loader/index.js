import React from "react";
import { useSelector } from "react-redux";
import { selectLoadding } from '../Redux/Reducers'
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import Lottie from 'react-lottie';
import animationData from '../../asset/images/Loading/loading.json'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },

};

const Loader = () => {
    const loaddingReducer = useSelector(selectLoadding) > 0;
    const [css, Setcss] = useState({
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: '#b5b4b4bd',
        height: '100vb',
        zIndex: 9999,
        textAlign: 'center'
    });

    useEffect(() => {
        if (!!loaddingReducer) {
            Setcss({
                ...css,
                display: 'flex'
            });
        }
        else {
            Setcss({
                ...css,
                display: 'none'
            });
        }
    }, [loaddingReducer]);

    return (
        <div style={css}>
            <div style={{ margin: 'auto' }}>
                {/* <Spin/>
                 */}
                <Lottie
                    style={{
                        clear: 'both',
                        position: 'absolute',
                        top: '40%',
                        left: 0,
                        right: 0,
                        transform: 'translateY(-40%)'
                    }}
                    options={defaultOptions}
                    width={200}
                    height={200}
                    isPaused={false}
                    isStopped={false}
                />
            </div>
        </div>
    );
}
export default Loader;