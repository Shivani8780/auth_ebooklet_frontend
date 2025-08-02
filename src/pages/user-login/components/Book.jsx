import React from 'react';

function Book() {
  return (
    <div className="book-container">
      <style>{`
        .book-container {
          max-width: 100%;
          width: 30rem;
          height: auto;
          aspect-ratio: 30 / 12;
          margin: 2rem auto;
          padding: 1rem;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
          background-color: #fefefe;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .book {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 70rem;
        }

        .cover,
        .page {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: 100% 0;
          border-radius: 5px 0 0 5px;
          box-shadow: inset 3px 0px 20px rgba(0, 0, 0, 0.2),
                      0px 0px 15px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }

        .cover {
          background-color: #36354e;
          background-image: url('/img1.jpeg'); /* Ensure image is in /public folder */
          background-size: cover;
          background-position: center;
          width: 9.25rem;
          height: 12rem;
        }

        .page {
          background-color: #e9e6c4;
          width: 9rem;
          height: 12rem;
          text-align: right;
          font-size: 8px;
          color: #777;
          font-family: monospace;
        }

        .page::before,
        .page::after {
          display: block;
          border-top: 1px dashed rgba(0, 0, 0, 0.3);
          content: "";
          padding-bottom: 1rem;
        }

        .cover.turn {
          animation: bookCover 9s forwards;
        }

        .page.turn {
          animation: bookOpen 9s forwards;
        }

        .page:nth-of-type(1) { animation-delay: 0.55s; }
        .page:nth-of-type(2) { animation-delay: 1.33s; }
        .page:nth-of-type(3) { animation-delay: 1.66s; }
        .page:nth-of-type(4) {
          animation: bookOpen150deg 9s forwards;
          animation-delay: 1s;
        }
        .page:nth-of-type(5) {
          animation: bookOpen30deg 3s forwards;
          animation-delay: 1.2s;
        }
        .page:nth-of-type(6) {
          animation: bookOpen55deg 3s forwards;
          animation-delay: 1.25s;
        }

        @keyframes bookOpen {
          30% { z-index: 999; }
          100% { transform: rotateY(180deg); z-index: 999; }
        }

        @keyframes bookCover {
          30% { z-index: 999; }
          100% { transform: rotateY(180deg); z-index: 1; }
        }

        @keyframes bookOpen150deg {
          30% { z-index: 999; }
          100% { transform: rotateY(150deg); z-index: 999; }
        }

        @keyframes bookOpen30deg {
          50% { z-index: 999; }
          100% { transform: rotateY(30deg); z-index: 999; }
        }

        @keyframes bookOpen55deg {
          30% { z-index: 999; }
          100% { transform: rotateY(55deg); z-index: 999; }
        }

        @media (max-width: 480px) {
          .book-container {
            width: 90vw;
            height: auto;
            aspect-ratio: auto;
            padding: 0.5rem;
            margin: 1rem auto;
          }

          .cover {
            width: 6rem;
            height: 8rem;
          }

          .page {
            width: 5.5rem;
            height: 8rem;
            font-size: 6px;
          }
        }
      `}</style>

      <div className="book">
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="page turn"></span>
        <span className="cover"></span>
        <span className="page"></span>
        <span className="cover turn"></span>
      </div>
    </div>
  );
}

export default Book;
