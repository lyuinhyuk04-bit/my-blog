// Elements
const viewContainer = document.getElementById('view-container');
const navItems = document.querySelectorAll('.nav-item[data-target]');

// Initial state
let currentView = 'home';

// Router basic logic
function handleRouting() {
  const hash = window.location.hash || '#home';
  
  if (hash.startsWith('#post/')) {
    const postId = hash.split('/')[1];
    renderPost(postId);
    updateNav(null); // Clear active nav on post
  } else if (hash === '#about') {
    renderAbout();
    updateNav('about');
  } else {
    renderHome();
    updateNav('home');
  }
}

function updateNav(target) {
  navItems.forEach(item => {
    if (item.getAttribute('data-target') === target) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Navigation event listeners
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const target = item.getAttribute('data-target');
    if (target) {
      e.preventDefault();
      window.location.hash = target === 'home' ? '' : target;
    }
  });
});

// Window hash change listener
window.addEventListener('hashchange', handleRouting);

// View Renderers
function renderHome() {
  let html = `
    <div class="fade-in">
      <h2 style="font-size: 2rem; margin-bottom: 2rem; color: #fff; font-weight: 800;">최신 포스팅</h2>
      <div class="post-list">
  `;
  
  // From data.js
  blogPosts.forEach((post, index) => {
    html += `
      <a href="#post/${post.id}" class="post-card" style="animation-delay: ${index * 0.1}s">
        <div class="post-meta">
          <span>📅 ${post.date}</span>
        </div>
        <h3 class="post-title">${post.title}</h3>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </a>
    `;
  });
  
  html += `
      </div>
    </div>
  `;
  
  viewContainer.innerHTML = html;
}

function renderPost(postId) {
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    viewContainer.innerHTML = `
      <div class="fade-in" style="text-align:center; padding: 5rem 0;">
        <h2>포스트를 찾을 수 없습니다. 😢</h2>
        <a href="#" class="back-btn" style="justify-content:center; margin-top:2rem;">
          돌아가기
        </a>
      </div>
    `;
    return;
  }
  
  const rawHtml = marked.parse(post.content);
  
  let html = `
    <div class="fade-in">
      <a href="#" class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        목록으로 돌아가기
      </a>
      
      <div class="post-header-view">
        <div class="post-meta" style="justify-content:center; margin-bottom: 1rem;">
          <span>📅 ${post.date}</span>
        </div>
        <h1>${post.title}</h1>
        <div class="post-tags" style="justify-content:center;">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      
      <div class="markdown-body">
        ${rawHtml}
      </div>
    </div>
  `;
  
  viewContainer.innerHTML = html;
  
  // Highlight JS execution
  if(window.Prism) {
    Prism.highlightAll();
  }
}

function renderAbout() {
  const aboutMd = `
# 👋 About Me

안녕하세요! 컴퓨터소프트웨어학과 1학년 **류인혁**입니다.

새로운 것을 배우고 만들어나가는 과정을 즐깁니다. 
지금은 기초 전공과목을 수강하며 프로그래밍의 기본기를 다지고 있고, 
개인적으로 프론트엔드 웹 개발(UI/UX, 모던 프레임워크)에 깊은 관심을 두고 있습니다.

## 🎯 Goals
- 매일매일 배운 것을 잊지 않기 위해 기록하기
- 의미 있는 사이드 프로젝트 스크래치부터 완성해보기
- 함께 성장할 개발자 동료 만들기

## 🛠 Skills (Learning)
- C, Python, JavaScript
- HTML/CSS
- React.js (Upcoming)

이 블로그에 방문해주셔서 감사합니다!
  `;
  
  const rawHtml = marked.parse(aboutMd);
  
  viewContainer.innerHTML = `
    <div class="fade-in">
      <div class="markdown-body">
        ${rawHtml}
      </div>
    </div>
  `;
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  handleRouting();
});
