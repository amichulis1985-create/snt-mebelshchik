"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const mapUrl = "https://maps.app.goo.gl/qVTfRzitdvMNno516";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

type PetName = "timka" | "pirat" | "barsik";

const petStories: Record<PetName, { name: string; role: string; story: string; image: string }> = {
  timka: {
    name: "Тимка",
    role: "главный встречающий",
    image: asset("/timka.webp"),
    story:
      "Я первым слышу, как машина сворачивает к даче! Из Артёма путь занимает около 25 минут, а из Владивостока — примерно час. Потом начинается самое интересное: знакомые улицы, запах леса и целый день на свежем воздухе.",
  },
  pirat: {
    name: "Пират",
    role: "хранитель тропинок",
    image: asset("/pirat.webp"),
    story:
      "Я знаю дорогу к ручью и лесные тропинки. Рядом сохранились развалины шахты 1930-х годов — смотреть на них можно только со взрослыми, не подходя близко и не заходя внутрь. Настоящий следопыт всегда помнит о безопасности!",
  },
  barsik: {
    name: "Барсик",
    role: "наблюдатель за природой",
    image: asset("/barsik.webp"),
    story:
      "С моей ветки видно всё: кедры на улицах, белок, бурундуков и множество диких птиц. В лесу растут грибы и живут дикие животные. Я наблюдаю тихо и никого не тревожу — так природа подпускает ближе.",
  },
};

export default function Home() {
  const [isKids, setIsKids] = useState(false);
  const restoreTimer = useRef<number | null>(null);

  useEffect(() => {
    restoreTimer.current = window.setTimeout(() => {
      setIsKids(window.localStorage.getItem("snt-site-mode") === "kids");
      restoreTimer.current = null;
    }, 0);
    return () => {
      if (restoreTimer.current !== null) window.clearTimeout(restoreTimer.current);
    };
  }, []);

  function switchMode(nextKids: boolean) {
    if (restoreTimer.current !== null) {
      window.clearTimeout(restoreTimer.current);
      restoreTimer.current = null;
    }
    setIsKids(nextKids);
    window.localStorage.setItem("snt-site-mode", nextKids ? "kids" : "adult");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main
      className={isKids ? "kids-mode" : "adult-mode"}
      style={{ "--hero-image": `url("${asset("/hero-production.webp")}")` } as CSSProperties}
    >
      <header className="site-header">
        <a className="brand" href="#top" aria-label="СНТ Мебельщик — на главную">
          <span className="brand-mark">М</span>
          <span>
            <strong>Мебельщик</strong>
            <small>садовое товарищество</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Основная навигация">
          {isKids ? (
            <>
              <a href="#kids-stories">Истории</a>
              <a href="#kids-nature">Фотоохота</a>
              <a href="#kids-rules">Правила</a>
            </>
          ) : (
            <>
              <a href="#about">О товариществе</a>
              <a href="#infrastructure">Инфраструктура</a>
              <a href="#nature">Природа</a>
              <a href="#join">Как вступить</a>
            </>
          )}
        </nav>

        <div className="header-actions">
          <a className="header-map" href={mapUrl} target="_blank" rel="noreferrer">
            На карте <span aria-hidden="true">↗</span>
          </a>
          <div className="mode-toggle" aria-label="Версия сайта">
            <button
              type="button"
              className={!isKids ? "active" : ""}
              aria-pressed={!isKids}
              onClick={() => switchMode(false)}
            >
              Взрослым
            </button>
            <button
              type="button"
              className={isKids ? "active" : ""}
              aria-pressed={isKids}
              onClick={() => switchMode(true)}
            >
              Детям
            </button>
          </div>
        </div>
      </header>

      <div className="adult-site" hidden={isKids}>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Суражевка · Приморский край</p>
          <h1 id="hero-title">Место, куда хочется возвращаться</h1>
          <p className="hero-lead">
            Дачное товарищество у Суражевки: 25 минут от Артёма и около часа
            от Владивостока. Лес, ручей и действующая инфраструктура.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#join">Стать членом СНТ</a>
            <a className="text-link" href={mapUrl} target="_blank" rel="noreferrer">
              Посмотреть расположение <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="hand-note" aria-hidden="true">Жить ближе к природе</p>
        </div>

        <div className="hero-image" role="img" aria-label="Дорога среди леса к дачным участкам СНТ Мебельщик" />
      </section>

      <section className="intro section" id="about">
        <div className="section-label"><span>01</span> О товариществе</div>
        <div className="intro-copy">
          <p className="eyebrow">Дача с историей</p>
          <h2>Сложившееся место,<br />а не проект на бумаге</h2>
          <p className="large-copy">
            СНТ «Мебельщик» существует с 1982 года. Территория площадью 9,8 га
            объединяет 92 участка и земли общего пользования.
          </p>
          <p>
            В последние годы в СНТ отремонтировали подъездную дорогу и
            восстановили электроснабжение. Товарищество развивается и принимает
            новых собственников участков.
          </p>
        </div>
        <aside className="history-card">
          <span className="history-year">1982</span>
          <p>год образования товарищества</p>
          <div className="history-rule" />
          <div className="history-stats">
            <div><strong>9,8 га</strong><span>территория</span></div>
            <div><strong>92</strong><span>участка</span></div>
          </div>
        </aside>
      </section>

      <section className="dacha-example" aria-labelledby="dacha-title">
        <figure>
          <img
            src={asset("/dacha-example.webp")}
            alt="Одна из дач в СНТ Мебельщик среди зелени"
            loading="lazy"
          />
          <figcaption>Одна из дач в СНТ «Мебельщик»</figcaption>
        </figure>
        <div className="dacha-copy">
          <p className="eyebrow">Настоящая дачная среда</p>
          <h2 id="dacha-title">Участки среди взрослого леса</h2>
          <p>
            Это не новый посёлок на расчищенном поле. Дачи и сады здесь
            формировались десятилетиями, поэтому вокруг сохранились взрослые
            деревья и естественная зелень.
          </p>
        </div>
      </section>

      <section className="infrastructure section" id="infrastructure">
        <div className="section-label light"><span>02</span> Инфраструктура</div>
        <div className="section-heading light-heading">
          <p className="eyebrow">Можно приезжать и строиться</p>
          <h2>Главное уже сделано</h2>
          <p>Базовая инфраструктура товарищества восстановлена и развивается.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-road">
            <span className="feature-index">01</span>
            <div className="road-line" aria-hidden="true"><i /><i /></div>
            <h3>Отремонтированная дорога</h3>
            <p>Подъездная дорога к территории приведена в порядок. До СНТ можно доехать на обычном легковом автомобиле.</p>
          </article>
          <article className="feature-card feature-power">
            <span className="feature-index">02</span>
            <div className="power-symbol" aria-hidden="true">↯</div>
            <h3>Электричество до 15 кВт</h3>
            <p>Доступная мощность — до 15 кВт на участок. Условия конкретного подключения уточняются у правления.</p>
          </article>
          <article className="feature-card feature-community">
            <span className="feature-index">03</span>
            <div className="tree-symbol" aria-hidden="true">△</div>
            <h3>Сложившаяся территория</h3>
            <p>92 участка, земли общего пользования и действующее товарищество, которое занимается развитием территории.</p>
          </article>
        </div>
      </section>

      <section className="nature section" id="nature">
        <div className="nature-panel">
          <p className="eyebrow">Природа рядом</p>
          <h2>Ручей, кедры<br />и живой лес</h2>
          <p>
            По территории СНТ протекает ручей, вдоль улиц растут взрослые кедры.
            Здесь много диких птиц; встречаются бурундуки и белки. Это часть
            обычной жизни товарищества, а не специально созданное озеленение.
            В окружающем лесу растут грибы и обитают дикие животные.
          </p>
          <ul className="nature-list">
            <li><span>01</span>Ручей на территории СНТ</li>
            <li><span>02</span>Взрослые кедры вдоль дачных улиц</li>
            <li><span>03</span>Дикие птицы, бурундуки и белки</li>
            <li><span>04</span>Грибы и дикие животные в окружающем лесу</li>
          </ul>
        </div>
        <blockquote>
          «Природа здесь начинается не за посёлком — она уже внутри СНТ»
        </blockquote>
      </section>

      <section className="local-history section" aria-labelledby="mine-title">
        <div className="section-label"><span>03</span> История места</div>
        <div className="local-history-copy">
          <p className="eyebrow">Следы прошлого</p>
          <h2 id="mine-title">Рядом работала шахта</h2>
          <p>
            В 1930-е годы рядом с нынешней территорией СНТ находилась шахта.
            В лесу до сих пор можно увидеть остатки её сооружений — ещё один
            исторический слой этого места.
          </p>
        </div>
        <aside className="history-note">
          <span>!</span>
          <p>
            Развалины не являются оборудованным туристическим объектом.
            Осматривать их следует осторожно и не заходить внутрь сохранившихся
            конструкций.
          </p>
        </aside>
      </section>

      <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">Фотографии территории</p>
            <h2 id="gallery-title">СНТ в разные сезоны</h2>
          </div>
          <p>
            Цветение весной, густая зелень летом, яркий дальневосточный лес
            осенью и тихие дачные улицы зимой. Все фотографии сделаны на
            территории товарищества.
          </p>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-one">
            <img src={asset("/gallery-summer.webp")} alt="Дачные участки летом" loading="lazy" />
            <figcaption>Дачные участки летом</figcaption>
          </figure>
          <figure className="gallery-two">
            <img src={asset("/gallery-cedar.webp")} alt="Взрослый кедр на территории СНТ" loading="lazy" />
            <figcaption>Кедр на территории СНТ</figcaption>
          </figure>
          <figure className="gallery-three">
            <img src={asset("/gallery-spring.webp")} alt="Весеннее цветение в СНТ" loading="lazy" />
            <figcaption>Весеннее цветение</figcaption>
          </figure>
          <figure className="gallery-four">
            <img src={asset("/gallery-autumn.webp")} alt="Осенний лес рядом с дачами" loading="lazy" />
            <figcaption>Осенний лес</figcaption>
          </figure>
          <figure className="gallery-five">
            <img src={asset("/gallery-squirrel.webp")} alt="Белка на дереве в СНТ" loading="lazy" />
            <figcaption>Белка на одном из участков</figcaption>
          </figure>
          <figure className="gallery-six">
            <img src={asset("/gallery-winter.webp")} alt="Дачная улица зимой" loading="lazy" />
            <figcaption>Зимний вечер</figcaption>
          </figure>
          <figure className="gallery-seven">
            <img src={asset("/gallery-harvest.webp")} alt="Помидоры и зелень, выращенные на даче" loading="lazy" />
            <figcaption>Урожай с участка</figcaption>
          </figure>
          <figure className="gallery-eight">
            <img src={asset("/gallery-berries.webp")} alt="Ягодный куст возле дачи" loading="lazy" />
            <figcaption>Ягоды возле дома</figcaption>
          </figure>
          <figure className="gallery-nine">
            <img src={asset("/gallery-forest-detail.webp")} alt="Грибы на стволе старого дерева" loading="lazy" />
            <figcaption>Детали живого леса</figcaption>
          </figure>
        </div>
      </section>

      <section className="join section" id="join">
        <div className="section-label"><span>04</span> Новым членам</div>
        <div className="section-heading">
          <p className="eyebrow">Простой следующий шаг</p>
          <h2>Как присоединиться</h2>
          <p>Подойдёт тем, кто выбирает участок осознанно и готов участвовать в жизни территории.</p>
        </div>
        <ol className="steps">
          <li><span>1</span><div><h3>Посмотреть место</h3><p>Оценить подъезд, окружение и расположение участков.</p></div></li>
          <li><span>2</span><div><h3>Уточнить варианты</h3><p>Связаться с правлением и узнать о доступных участках и условиях.</p></div></li>
          <li><span>3</span><div><h3>Вступить в СНТ</h3><p>Оформить участок и стать частью товарищества.</p></div></li>
        </ol>
      </section>

      <section className="location section" id="location">
        <div className="map-art" aria-hidden="true">
          <span className="map-road road-a" />
          <span className="map-road road-b" />
          <span className="map-pin"><i />Мебельщик</span>
          <span className="map-place place-a">Суражевка</span>
          <span className="map-place place-b">Артём</span>
        </div>
        <div className="location-copy">
          <p className="eyebrow">Где мы находимся</p>
          <h2>Рядом с Суражевкой</h2>
          <p>
            Доехать можно примерно за 25 минут из Артёма и за час из
            Владивостока. Время ориентировочное и зависит от точки выезда и
            дорожной обстановки.
          </p>
          <div className="travel-times" aria-label="Ориентировочное время в пути">
            <div><strong>25 минут</strong><span>из Артёма</span></div>
            <div><strong>1 час</strong><span>из Владивостока</span></div>
          </div>
          <a className="button button-accent" href={mapUrl} target="_blank" rel="noreferrer">
            Открыть в Google Maps <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="faq section" aria-labelledby="faq-title">
        <div>
          <p className="eyebrow">Коротко о главном</p>
          <h2 id="faq-title">Вопросы перед поездкой</h2>
        </div>
        <div className="faq-list">
          <details><summary>Можно ли подключить электричество?</summary><p>На территории есть электрическая инфраструктура. Доступная мощность — до 15 кВт на участок; порядок подключения уточняется в правлении.</p></details>
          <details><summary>Как добраться до товарищества?</summary><p>Точка СНТ указана на карте. Ориентировочное время в пути — 25 минут из Артёма и около часа из Владивостока. Подъездная дорога отремонтирована.</p></details>
          <details><summary>Есть ли свободные участки?</summary><p>Актуальную информацию о продаже участков и вступлении в товарищество необходимо уточнять у правления СНТ.</p></details>
        </div>
      </section>

      <footer className="footer">
        <div>
          <p className="eyebrow">СНТ «Мебельщик»</p>
          <h2>Ваша дача может<br />начинаться здесь</h2>
        </div>
        <div className="footer-action">
          <p>Приезжайте посмотреть территорию, ручей, кедры и одну из сложившихся дачных улиц.</p>
          <a className="button button-light" href={mapUrl} target="_blank" rel="noreferrer">Построить маршрут <span aria-hidden="true">↗</span></a>
        </div>
        <div className="footer-bottom">
          <span>Суражевка · Приморский край</span>
          <span>© {new Date().getFullYear()} СНТ «Мебельщик»</span>
        </div>
      </footer>
      </div>

      <div className="kids-site" hidden={!isKids}>
        <KidsVersion />
      </div>
    </main>
  );
}

function KidsVersion() {
  const [activePet, setActivePet] = useState<PetName>("timka");
  const pet = petStories[activePet];

  return (
    <>
      <section className="kids-hero" id="top" aria-labelledby="kids-title">
        <div className="kids-hero-copy">
          <p className="kids-kicker">Детская версия · СНТ «Мебельщик»</p>
          <h1 id="kids-title">Приключения начинаются на даче!</h1>
          <p>
            Тимка, Пират и Барсик покажут ручей, кедры и лес — и расскажут,
            почему здесь каждый день можно заметить что-то новое.
          </p>
          <a className="kids-button" href="#kids-stories">Слушать истории <span aria-hidden="true">↓</span></a>
        </div>
        <div className="kids-hero-pets" aria-label="Тимка, Пират и Барсик">
          {(Object.keys(petStories) as PetName[]).map((key, index) => (
            <button
              type="button"
              key={key}
              className={`hero-pet hero-pet-${index + 1}`}
              onClick={() => {
                setActivePet(key);
                document.querySelector("#kids-stories")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label={`Послушать историю персонажа ${petStories[key].name}`}
            >
              <img src={petStories[key].image} alt="" />
              <span>{petStories[key].name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="kids-stories" id="kids-stories" aria-labelledby="stories-title">
        <div className="kids-section-heading">
          <p>Нажми на героя</p>
          <h2 id="stories-title">Три дачные истории</h2>
        </div>
        <div className="story-stage">
          <div className="story-pets" role="tablist" aria-label="Выбрать рассказчика">
            {(Object.keys(petStories) as PetName[]).map((key) => (
              <button
                type="button"
                role="tab"
                aria-selected={activePet === key}
                key={key}
                className={activePet === key ? "story-pet active" : "story-pet"}
                onClick={() => setActivePet(key)}
              >
                <img src={petStories[key].image} alt={petStories[key].name} />
                <strong>{petStories[key].name}</strong>
                <small>{petStories[key].role}</small>
              </button>
            ))}
          </div>
          <article className={`speech-card speech-${activePet}`} aria-live="polite">
            <span className="speech-name">Рассказывает {pet.name}</span>
            <p>«{pet.story}»</p>
          </article>
        </div>
      </section>

      <section className="kids-nature" id="kids-nature" aria-labelledby="hunt-title">
        <div className="kids-section-heading">
          <p>Фотоохота</p>
          <h2 id="hunt-title">Что найдёшь ты?</h2>
          <span>На этих фотографиях всё настоящее — снято в СНТ «Мебельщик».</span>
        </div>
        <div className="hunt-grid">
          <figure><img src={asset("/gallery-squirrel.webp")} alt="Белка на дереве" /><figcaption><b>01</b> Найди белку</figcaption></figure>
          <figure><img src={asset("/gallery-cedar.webp")} alt="Кедр в СНТ" /><figcaption><b>02</b> Рассмотри кедр</figcaption></figure>
          <figure><img src={asset("/gallery-spring.webp")} alt="Весенние цветы" /><figcaption><b>03</b> Сосчитай цветы</figcaption></figure>
          <figure><img src={asset("/gallery-forest-detail.webp")} alt="Грибы на дереве" /><figcaption><b>04</b> Заметь грибы</figcaption></figure>
        </div>
      </section>

      <section className="kids-rules" id="kids-rules" aria-labelledby="rules-title">
        <div className="rules-intro">
          <p>Кодекс юного исследователя</p>
          <h2 id="rules-title">Смотреть, слушать, беречь</h2>
          <span>Так приключения остаются весёлыми и безопасными.</span>
        </div>
        <ol className="rules-list">
          <li><span>1</span><div><strong>К ручью — со взрослыми</strong><p>У воды не бегаем и не подходим к краю одни.</p></div></li>
          <li><span>2</span><div><strong>Грибы не пробуем</strong><p>Незнакомые грибы только фотографируем.</p></div></li>
          <li><span>3</span><div><strong>Зверей не тревожим</strong><p>Наблюдаем издалека и не кормим диких животных.</p></div></li>
          <li><span>4</span><div><strong>В развалины не заходим</strong><p>Следы старой шахты смотрим только со взрослым и с безопасного расстояния.</p></div></li>
        </ol>
      </section>

      <section className="kids-finish">
        <div className="finish-pets" aria-hidden="true">
          <img src={asset("/timka.webp")} alt="" />
          <img src={asset("/pirat.webp")} alt="" />
          <img src={asset("/barsik.webp")} alt="" />
        </div>
        <div>
          <p>До встречи в СНТ «Мебельщик»!</p>
          <h2>Приезжай знакомиться с дачей</h2>
          <a className="kids-button light" href={mapUrl} target="_blank" rel="noreferrer">Показать взрослым карту <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  );
}
