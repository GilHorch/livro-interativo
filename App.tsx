
import { useRef, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import type { ReactNode } from "react";
import "./App.css";

type PageProps = {
  children: ReactNode;
  className?: string;
  number?: number;
};

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, className = "", number }, ref) => (
    <div className={`page ${className}`} ref={ref}>
      <div className="paper">
        {children}
        {number !== undefined && (
          <div className="page-number">{number}</div>
        )}
      </div>
    </div>
  )
);

Page.displayName = "Page";

const chapters = [
  {
    title: "O começo de uma jornada",
    text: "Toda grande história começa com uma primeira página. Às vezes, basta um pequeno passo para descobrir um mundo inteiro que estava esperando para ser explorado.",
    image: "/images/floresta.jpg",
    caption: "Um mundo à espera de ser descoberto.",
  },
  {
    title: "Entre luz e sombra",
    text: "A luz da manhã atravessava as árvores, desenhando caminhos dourados sobre o chão. O silêncio parecia guardar histórias antigas, esperando alguém disposto a escutá-las.",
    image: "/images/montanhas.jpg",
    caption: "A beleza dos caminhos desconhecidos.",
  },
  {
    title: "O valor das descobertas",
    text: "Cada lugar revelava algo novo. Não eram apenas as paisagens que mudavam, mas também a maneira de olhar para tudo aquilo que antes parecia comum.",
    image: "/images/lago.jpg",
    caption: "Algumas respostas aparecem no silêncio.",
  },
];

function Cover() {
  return (
    <Page className="cover">
      <div className="cover-frame">
        <span className="cover-kicker">UMA EDIÇÃO ESPECIAL</span>
        <div className="cover-ornament">✳</div>
        <h1>O Livro das<br />Descobertas</h1>
        <p className="cover-subtitle">
          Histórias, memórias e novos horizontes
        </p>
        <div className="cover-rule" />
        <p className="cover-author">UMA HISTÓRIA INTERATIVA</p>
      </div>
    </Page>
  );
}

function App() {
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);

  const nextPage = () => bookRef.current?.pageFlip().flipNext();
  const prevPage = () => bookRef.current?.pageFlip().flipPrev();

  const totalPages = chapters.length * 2 + 2;
  const currentPage = Math.min(page + 1, totalPages);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Página inicial">
          <span className="brand-mark">L.</span>
          <span>Biblioteca de Histórias</span>
        </a>
        <span className="edition">EDIÇÃO DIGITAL · Nº 001</span>
      </header>

      <section className="reading-area">
        <div className="intro">
          <span className="eyebrow">UMA EXPERIÊNCIA DE LEITURA</span>
          <h2>Abra. Explore.<br /><em>Descubra.</em></h2>
          <p>
            Um livro para explorar sem pressa.
            Vire as páginas e descubra o que vem a seguir.
          </p>
        </div>

        <div className="book-stage">
          <div className="book-shadow" />

          <HTMLFlipBook
            ref={bookRef}
            width={380}
            height={510}
            size="stretch"
            minWidth={280}
            maxWidth={460}
            minHeight={360}
            maxHeight={620}
            maxShadowOpacity={0.48}
            showCover={true}
            mobileScrollSupport={true}
            usePortrait={true}
            drawShadow={true}
            flippingTime={900}
            useMouseEvents={true}
            swipeDistance={25}
            showPageCorners={true}
            startPage={0}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            disableFlipByClick={false}
            onFlip={(e: { data: number }) => setPage(e.data)}
            className="book"
            style={{}}
            startZIndex={0}
          >
            <Cover />

            <Page>
              <div className="opening-page">
                <span className="small-cap">ANTES DE COMEÇAR</span>
                <h2>Uma história<br />espera por você.</h2>
                <p>
                  Cada página é um convite para desacelerar,
                  imaginar e enxergar o mundo de outra maneira.
                </p>
                <div className="small-flourish">✳</div>
              </div>
            </Page>

            {chapters.map((chapter, index) => (
              <Page key={`text-${index}`} number={index * 2 + 1}>
                <article className="chapter">
                  <span className="chapter-label">
                    CAPÍTULO {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>{chapter.title}</h2>
                  <div className="text-rule" />
                  <p>{chapter.text}</p>
                  <p>
                    A jornada continua em cada detalhe,
                    em cada encontro e em cada nova página.
                  </p>
                  <span className="chapter-end">✳</span>
                </article>
              </Page>
            ))}

            {chapters.map((chapter, index) => (
              <Page key={`image-${index}`} number={index * 2 + 2}>
                <figure className="photo-page">
                  <img
                    src={chapter.image}
                    alt={chapter.caption}
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                  <figcaption>{chapter.caption}</figcaption>
                </figure>
              </Page>
            ))}

            <Page className="back-cover">
              <div className="back-cover-inner">
                <span className="cover-ornament">✳</span>
                <p>O fim de um capítulo<br />é o começo de outro.</p>
                <span className="back-small">FIM DESTA EDIÇÃO</span>
              </div>
            </Page>
          </HTMLFlipBook>
        </div>

        <div className="book-controls">
          <button
            className="nav-button"
            onClick={prevPage}
            aria-label="Página anterior"
            disabled={page === 0}
          >
            <span>←</span> <span className="button-label">Anterior</span>
          </button>

          <div className="page-counter">
            <span className="current-page">
              {String(currentPage).padStart(2, "0")}
            </span>
            <span className="counter-divider">/</span>
            <span>{String(totalPages).padStart(2, "0")}</span>
          </div>

          <button
            className="nav-button"
            onClick={nextPage}
            aria-label="Próxima página"
            disabled={page >= totalPages - 1}
          >
            <span className="button-label">Próxima</span> <span>→</span>
          </button>
        </div>

        <p className="reading-hint">
          ARR AS TE A FOLHA OU USE AS SETAS PARA NAVEGAR
        </p>
      </section>

      <footer className="footer">
        <span>FEITO PARA LER SEM PRESSA</span>
        <span>Uma biblioteca, infinitas possibilidades.</span>
      </footer>
    </main>
  );
}

export default App;

