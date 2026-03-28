import React from 'react';

const Location = () => {
    const address = "서울특별시 강남구 선릉로145길 17";
    const phone = "02-516-5066";

    // 주소 복사 함수
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(address);
        alert("주소가 복사되었습니다.");
    };

    return (
        <section style={containerStyle}>
            {/* 타이틀 영역 (Invitation 스타일 계승) */}
            <div style={titleContainerStyle}>
                <div style={titleStyle}>Location</div>
                <div style={verticalLineStyle}></div>
            </div>

            {/* 성당 정보 */}
            <div style={infoBoxStyle}>
                <h3 style={infoStyle}>2026년 08월 22일 토요일 오후 12시</h3>
                <h3 style={infoStyle}>논현2동 성당</h3>
                <p style={addressStyle}><button onClick={handleCopyAddress}>
                    <span style={{ color: '#333', textDecoration: 'none' }}>📋 {address}</span>
                </button></p>
                <p style={addressStyle}><a href={`tel:${phone}`} >
                    📞 {phone}
                </a></p>
            </div>

            <div style={mapImageContainerStyle}>
                <img
                    src={process.env.PUBLIC_URL + "/images/map.jpg"}
                    alt="논현2동 성당 지도"
                    style={mapImageStyle}
                />
            </div>

            {/* 길찾기 앱 버튼들 */}
            <div style={naviButtonGroupStyle}>
                <a href="https://map.naver.com/v5/search/논현2동성당" target="_blank" rel="noreferrer" style={naviButtonStyle}>
                    <span style={{ color: '#03C75A' }}>●</span> 네이버지도
                </a>
                <a href="https://map.kakao.com/link/to/논현2동성당,37.5204,127.0361" target="_blank" rel="noreferrer" style={naviButtonStyle}>
                    <span style={{ color: '#FEE500' }}>●</span> 카카오내비
                </a>
                <a href="https://surl.tmap.co.kr/..." target="_blank" rel="noreferrer" style={naviButtonStyle}>
                    <span style={{ color: '#FF0000' }}>●</span> 티맵
                </a>
            </div>

            <div style={transportContainerStyle}>
                {/* 지하철 */}
                <div style={infoRowStyle}>
                    <div style={descriptionStyle}>
                        <span style={subtitleStyle}>지하철</span><br />
                        <span style={subTextStyle}><strong>7호선·수인분당선 강남구청역</strong></span>
                        <span style={subTextStyle}>3-1번 출구에서 영동고교 방면 도보 7분 (450m)</span>
                    </div>
                </div>

                {/* 버스 */}
                <div style={infoRowStyle}>
                    <div style={descriptionStyle}>
                        <span style={subtitleStyle}>버스</span><br />
                        <div style={busListStyle}>
                            <span style={subTextStyle}><strong>영동고교 앞 / 시네시티 앞 / 제일은행 앞 하차</strong></span>
                            <span><b style={{ color: '#3b5bdb' }}>간선</b> 145, 301, 342, 440, 472</span>
                            <span><b style={{ color: '#2b8a3e' }}>지선</b> 3011, 4212, 4412, 4419</span>
                        </div>
                    </div>
                </div>

                {/* 주차 */}
                <div style={infoRowStyle}>

                    <div style={descriptionStyle}>
                        <span style={subtitleStyle}>자가용</span><br />
                        <span style={subTextStyle}><strong>성당 내 주차장 이용</strong></span>
                        <span style={subTextStyle}>
                            주차 공간이 협소하오니 가급적 대중교통 이용을 권장드려요.<br />
                            만차 시 안내 요원이 인근 주차장으로 안내해 드립니다.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- 스타일 객체 모음 ---

const containerStyle = {
    padding: '60px 20px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
};

const titleContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const titleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ff4d4d',
    marginBottom: '10px',
    letterSpacing: '2px'
};

const verticalLineStyle = {
    marginTop: '10px',
    marginBottom: '30px',
    width: '30px',
    height: '1px',
    backgroundColor: "#ddd"
};

const infoBoxStyle = {
    marginBottom: '30px',
};

const infoStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 12px 0'
};

const addressStyle = {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '10px'
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
};

const subButtonStyle = {
    padding: '8px 15px',
    border: '1px solid #eee',
    borderRadius: '20px',
    fontSize: '0.85rem',
    color: '#888',
    textDecoration: 'none',
    backgroundColor: '#fafafa',
    cursor: 'pointer'
};

const mapImageContainerStyle = {
    width: '100%',
    maxWidth: '450px',
    height: '250px',
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    // overflow: 'hidden',
    marginBottom: '20px',
    // border: '1px solid #eee'
};

const mapImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const naviButtonGroupStyle = {
    display: 'flex',
    width: '100%',
    maxWidth: '450px',
    gap: '10px'
};

const naviButtonStyle = {
    flex: 1,
    padding: '12px 0',
    border: '1px solid #eee',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: '#333',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};
const transportContainerStyle = {
    width: '100%',
    maxWidth: '450px',
    textAlign: 'left',
    marginTop: '40px',

};

const infoRowStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px',
    alignItems: 'flex-start',
};


const descriptionStyle = {
    margin: '4px 0',
    fontSize: '1rem',
    color: '#333',
    lineHeight: '1.6',
};

const subtitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ff4d4d',
}
const subTextStyle = {
    display: 'block',
    marginTop: '4px',
};

const busListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginTop: '4px',
};

export default Location;