const YEAR = 2027;
const months = [
  { en: "JANUARY", ko: "1월", caption: "여섯 주 아가의 포근한 시작", file: "01.jpg", source: "https://commons.wikimedia.org/wiki/File:Sleeping_kitten.jpg" },
  { en: "FEBRUARY", ko: "2월", caption: "꿈속에서도 말랑한 발끝", file: "02.jpg", source: "https://commons.wikimedia.org/wiki/File:Kitten_sleeping.jpg" },
  { en: "MARCH", ko: "3월", caption: "작은 턱시도 아가의 낮잠", file: "03.jpg", source: "https://commons.wikimedia.org/wiki/File:Sleeping_tuxedo_kitten.jpg" },
  { en: "APRIL", ko: "4월", caption: "세상이 온통 놀이터인 계절", file: "04.jpg", source: "https://commons.wikimedia.org/wiki/File:Kitten-playing.jpg" },
  { en: "MAY", ko: "5월", caption: "여덟 주 아가의 반짝이는 눈", file: "05.jpg", source: "https://commons.wikimedia.org/wiki/File:Closeup_of_Orange_Kitten.jpg" },
  { en: "JUNE", ko: "6월", caption: "호기심이 먼저 달려가는 날", file: "06.jpg", source: "https://commons.wikimedia.org/wiki/File:A_kitten_playing.JPG" },
  { en: "JULY", ko: "7월", caption: "열 주 아가의 발라당 휴가", file: "07.jpg", source: "https://commons.wikimedia.org/wiki/File:Orange_Kitten_on_its_Back.jpg" },
  { en: "AUGUST", ko: "8월", caption: "시원한 자리에서 새근새근", file: "08.jpg", source: "https://commons.wikimedia.org/wiki/File:Cute_Kitten_sleeping_on_bed.jpg" },
  { en: "SEPTEMBER", ko: "9월", caption: "혀를 살짝 내민 달콤한 꿈", file: "09.jpg", source: "https://commons.wikimedia.org/wiki/File:Sleeping_Kitten.jpg" },
  { en: "OCTOBER", ko: "10월", caption: "둘이라서 더 신나는 가을", file: "10.jpg", source: "https://commons.wikimedia.org/wiki/File:Kittens_Playing_(5249988807).jpg" },
  { en: "NOVEMBER", ko: "11월", caption: "한 달 아가의 조심스러운 걸음", file: "11.jpg", source: "https://commons.wikimedia.org/wiki/File:1-month-old_kittens_26.jpg" },
  { en: "DECEMBER", ko: "12월", caption: "한 달 아가와 따뜻한 마무리", file: "12.jpg", source: "https://commons.wikimedia.org/wiki/File:Young_Kitten.JPG" }
];

const photo = document.querySelector("#cat-photo");
const days = document.querySelector("#days");
const monthNumber = document.querySelector("#month-number");
const monthName = document.querySelector("#month-name");
const photoIndex = document.querySelector("#photo-index");
const photoCaption = document.querySelector("#photo-caption");
const selector = document.querySelector("#month-selector");
let activeMonth = 0;

function calendarCells(month) {
  const firstDay = new Date(YEAR, month, 1).getDay();
  const lastDate = new Date(YEAR, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < 42; i += 1) {
    const date = i - firstDay + 1;
    cells.push(date > 0 && date <= lastDate ? date : "");
  }
  return cells;
}

function renderMonth(month, animate = true) {
  activeMonth = (month + 12) % 12;
  const data = months[activeMonth];
  if (animate) photo.classList.add("changing");

  window.setTimeout(() => {
    photo.src = `assets/kittens/${data.file}`;
    photo.alt = `${data.ko}을 장식하는 아기 고양이 사진`;
    monthNumber.textContent = String(activeMonth + 1).padStart(2, "0");
    monthName.textContent = data.en;
    photoIndex.textContent = `CAT ${String(activeMonth + 1).padStart(2, "0")} / 12`;
    photoCaption.textContent = data.caption;
    days.setAttribute("aria-label", `${YEAR}년 ${activeMonth + 1}월`);
    days.replaceChildren(...calendarCells(activeMonth).map((date, index) => {
      const cell = document.createElement("span");
      cell.className = `day${date === "" ? " empty" : ""}${index % 7 === 0 && date !== "" ? " sunday" : ""}`;
      cell.setAttribute("role", "gridcell");
      cell.textContent = date || "·";
      return cell;
    }));

    selector.querySelectorAll("button").forEach((button, index) => {
      button.setAttribute("aria-current", index === activeMonth ? "true" : "false");
    });
    photo.classList.remove("changing");
  }, animate ? 130 : 0);
}

months.forEach((month, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = index + 1;
  button.setAttribute("aria-label", `${month.ko} 보기`);
  button.addEventListener("click", () => renderMonth(index));
  selector.append(button);
});

document.querySelector("#prev-month").addEventListener("click", () => renderMonth(activeMonth - 1));
document.querySelector("#next-month").addEventListener("click", () => renderMonth(activeMonth + 1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") renderMonth(activeMonth - 1);
  if (event.key === "ArrowRight") renderMonth(activeMonth + 1);
});

const miniCalendars = document.querySelector("#mini-calendars");
months.forEach((month, monthIndex) => {
  const article = document.createElement("article");
  article.className = "mini-month";
  const heading = document.createElement("h3");
  heading.textContent = `${String(monthIndex + 1).padStart(2, "0")} / ${month.en}`;
  const grid = document.createElement("div");
  grid.className = "mini-grid";
  ["일", "월", "화", "수", "목", "금", "토"].forEach((weekday, index) => {
    const label = document.createElement("span");
    label.className = `mini-weekday${index === 0 ? " sun" : ""}`;
    label.textContent = weekday;
    grid.append(label);
  });
  calendarCells(monthIndex).forEach((date, index) => {
    const cell = document.createElement("span");
    if (index % 7 === 0 && date !== "") cell.className = "sun";
    cell.textContent = date || "";
    grid.append(cell);
  });
  article.append(heading, grid);
  miniCalendars.append(article);
});

const credits = document.querySelector("#photo-credits");
months.forEach((month) => {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.href = month.source;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = `${month.ko} — Wikimedia Commons`;
  item.append(link);
  credits.append(item);
});

const emojiField = document.querySelector(".emoji-field");
const catEmojis = ["🐈", "🐈‍⬛", "🐱", "😺", "😽"];
for (let i = 0; i < 18; i += 1) {
  const cat = document.createElement("span");
  cat.className = "floating-cat";
  cat.textContent = catEmojis[i % catEmojis.length];
  cat.style.left = `${(i * 37) % 100}%`;
  cat.style.fontSize = `${1.4 + (i % 5) * .45}rem`;
  cat.style.animationDuration = `${17 + (i % 7) * 3}s`;
  cat.style.animationDelay = `${-i * 2.7}s`;
  cat.style.setProperty("--drift", `${(i % 2 ? 1 : -1) * (24 + (i % 4) * 18)}px`);
  cat.style.setProperty("--tilt", `${-18 + (i % 7) * 6}deg`);
  emojiField.append(cat);
}

photo.addEventListener("error", () => {
  photo.alt = "고양이 사진을 불러오지 못했습니다";
});

renderMonth(0, false);
