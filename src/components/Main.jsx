import React from "react";
import Event from "./Event.jsx";

const TABS = {
    all: {
        title: 'Все',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Yeelight LED Smart Bulb',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'D-Link Omna 180 Cam',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'temp',
            iconLabel: 'Температура',
            title: 'Elgato Eve Degree Connected',
            subtitle: 'Выключено до 17:00'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'LIFX Mini Day & Dusk A60 E27',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }]
    },
    kitchen: {
        title: 'Кухня',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Yeelight LED Smart Bulb',
            subtitle: 'Включено'
        }, {
            icon: 'temp',
            iconLabel: 'Температура',
            title: 'Elgato Eve Degree Connected',
            subtitle: 'Выключено до 17:00'
        }]
    },
    hall: {
        title: 'Зал',
        items: [{
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Выключено'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Выключено'
        }]
    },
    lights: {
        title: 'Лампочки',
        items: [{
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'D-Link Omna 180 Cam',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'LIFX Mini Day & Dusk A60 E27',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }]
    },
    cameras: {
        title: 'Камеры',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }]
    }
};
for (let i = 0; i < 6; ++i) {
    TABS.all.items = [...TABS.all.items, ...TABS.all.items]; // TODO: подумать
}
const TABS_KEYS = Object.keys(TABS);


function Main() {
    const ref = React.useRef();
    const [activeTab, setActiveTab] = React.useState('');
    const [hasRightScroll, setHasRightScroll] = React.useState(false);
    const [visibleItems, setVisibleItems] = React.useState([]);
    const itemsPerLoad = 20;

    React.useEffect(() => {
        if (!activeTab) {
            const currActiveTab = new URLSearchParams(location.search).get('tab') || 'all'
            setActiveTab(currActiveTab);
            setVisibleItems(TABS[currActiveTab].items.slice(0, itemsPerLoad));
        }
    }, []);

    React.useEffect(() => {
        const a = document.getElementById('panel_' + activeTab)
        if (a) {
            const lastChild = a.firstChild.lastChild

            if (lastChild.getBoundingClientRect().right <= ref.current.getBoundingClientRect().right) {
                setHasRightScroll(false)
            } else {
                setHasRightScroll(true)
            }
        }
    }, [activeTab])

    const onSelectInput = event => {
        setActiveTab(event.target.value);
        setVisibleItems(TABS[event.target.value].items.slice(0, itemsPerLoad));

    };

    const onArrowCLick = () => {
        const scroller = ref.current.querySelector('.section__panel:not(.section__panel_hidden)');
        if (scroller) {
            scroller.scrollTo({
                left: scroller.scrollLeft + 400,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = (e) => {
        if (e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth) {
            const moreItems = TABS[activeTab].items.slice(visibleItems.length, visibleItems.length + itemsPerLoad);
            setVisibleItems((prevItems) => [...prevItems, ...moreItems]);
        }
    };

    return (
        <main className="main">
            <section className="section main__general">
                <h2 className="section__title section__title-header section__main-title">Главное</h2>
                <div className="hero-dashboard">
                    <div className="hero-dashboard__primary">
                        <h3 className="hero-dashboard__title">Привет, Геннадий!</h3>
                        <p className="hero-dashboard__subtitle">Двери и окна закрыты, сигнализация включена.</p>
                        <ul className="hero-dashboard__info">
                            <li className="hero-dashboard__item">
                                <div className="hero-dashboard__item-title">Дома</div>
                                <div className="hero-dashboard__item-details">
                                    +23
                                    <span className="a11y-hidden">°</span>
                                </div>
                            </li>
                            <li className="hero-dashboard__item">
                                <div className="hero-dashboard__item-title">За окном</div>
                                <div className="hero-dashboard__item-details">
                                    +19
                                    <span className="a11y-hidden">°</span>

                                    <div
                                        className="hero-dashboard__icon hero-dashboard__icon_rain"
                                        role="img"
                                        aria-label="Дождь"
                                    ></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul className="hero-dashboard__schedule">
                        <Event
                            icon="temp"
                            iconLabel="Температура"
                            title="Philips Cooler"
                            subtitle="Начнет охлаждать в 16:30"
                        />
                        <Event
                            icon="light"
                            iconLabel="Освещение"
                            title="Xiaomi Yeelight LED Smart Bulb"
                            subtitle="Включится в 17:00"
                        />
                        <Event
                            icon="light"
                            iconLabel="Освещение"
                            title="Xiaomi Yeelight LED Smart Bulb"
                            subtitle="Включится в 17:00"
                        />
                    </ul>
                </div>
            </section>

            <section className="section main__scripts">
                <h2 className="section__title section__title-header">Избранные сценарии</h2>

                <ul className="event-grid">
                    <Event
                        slim={true}
                        icon="light2"
                        iconLabel="Освещение"
                        title="Выключить весь свет в доме и во дворе"
                    />
                    <Event
                        slim={true}
                        icon="schedule"
                        iconLabel="Расписание"
                        title="Я ухожу"
                    />
                    <Event
                        slim={true}
                        icon="light2"
                        iconLabel="Освещение"
                        title="Включить свет в коридоре"
                    />
                    <Event
                        slim={true}
                        icon="temp2"
                        iconLabel="Температура"
                        title="Набрать горячую ванну"
                        subtitle="Начнётся в 18:00"
                    />
                    <Event
                        slim={true}
                        icon="temp2"
                        iconLabel="Температура"
                        title="Сделать пол тёплым во всей квартире"
                    />
                </ul>
            </section>
            <section className="section main__devices">
                <div className="section__title">
                    <h2 className="section__title-header">
                        Избранные устройства
                    </h2>

                    <select className="section__select" defaultValue="all" onInput={onSelectInput}>
                        {TABS_KEYS.map(key =>
                            <option key={key} value={key}>
                                {TABS[key].title}
                            </option>
                        )}
                    </select>

                    <ul role="tablist" className="section__tabs">
                        {TABS_KEYS.map(key =>
                            <li
                                key={key}
                                role="tab"
                                aria-selected={key === activeTab ? 'true' : 'false'}
                                tabIndex={key === activeTab ? '0' : undefined}
                                className={'section__tab' + (key === activeTab ? ' section__tab_active' : '')}
                                id={`tab_${key}`}
                                aria-controls={`panel_${key}`}
                                onClick={() => {
                                    setActiveTab(key)
                                    setVisibleItems(TABS[key].items.slice(0, itemsPerLoad));

                                }}
                            >
                                {TABS[key].title}
                            </li>
                        )}
                    </ul>
                </div>

                <div className="section__panel-wrapper" ref={ref}>
                    {activeTab &&
                        <div role="tabpanel"
                             className={'section__panel'}
                             id={`panel_${activeTab}`}
                             aria-labelledby={`tab_${activeTab}`}
                             aria-hidden={'false'}
                        onScroll={handleScroll}>
                            <ul className="section__panel-list">

                                {visibleItems.map((item, index) =>
                                    <Event
                                        key={index}
                                        {...item}
                                    />
                                )}

                            </ul>
                        </div>
                    }

                    {hasRightScroll &&
                        <div className="section__arrow" onClick={onArrowCLick}></div>
                    }
                </div>
            </section>
        </main>
    )
}


export default Main