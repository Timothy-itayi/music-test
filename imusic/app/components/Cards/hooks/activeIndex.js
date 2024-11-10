// import { useState, useEffect, useCallback } from 'react';

// const useActiveIndex = (totalCards) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const cards = document.querySelectorAll('.card');
//     if (cards.length === 0) {
//       console.warn('No cards found to observe. Ensure cards have the "card" class.');
//       return;
//     }

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = Array.from(cards).indexOf(entry.target);
//             setActiveIndex(index);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     cards.forEach((card) => observer.observe(card));

//     return () => observer.disconnect();
//   }, [totalCards]);

//   return [activeIndex, setActiveIndex];
// };

// export default useActiveIndex;