const listView = document.getElementById('list-view');
const postView = document.getElementById('post-view');
const postListContainer = document.getElementById('post-list-container');
const postContentContainer = document.getElementById('post-content-container');
const topbarTitle = document.getElementById('topbar-title');

function handleRouting() {
  // 거추장스러운 home 분기를 없애고, 기본 진입점을 list로 설정합니다.
  const hash = window.location.hash || '#list';

  // 숨김 초기화
  listView.classList.add('hidden');
  postView.classList.add('hidden');

  if (hash.startsWith('#post/')) {
    const postId = hash.split('/')[1];
    postView.classList.remove('hidden');
    topbarTitle.innerText = "Detailed Post";
    renderPost(postId);
  } else {
    listView.classList.remove('hidden');
    topbarTitle.innerText = "Research Logs";
    if (!postListContainer.hasChildNodes()) {
      renderList();
    }
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
}

function renderList() {
  let html = '';
  blogPosts.forEach(post => {
    html += `
        <a href="#post/${post.id}" class="group bg-white hover:bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md cursor-pointer">
            <div class="flex items-center gap-6 flex-1 w-full">
                <div class="hidden md:flex w-12 h-12 bg-blue-50 rounded-xl items-center justify-center flex-shrink-0 border border-blue-100">
                    <span class="material-symbols-outlined text-blue-600">fingerprint</span>
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-1">
                         <span class="text-[10px] text-blue-600 font-bold tracking-widest uppercase bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Log ${String(post.index).padStart(2, '0')}</span>
                         <span class="text-[11px] text-slate-400 font-medium">${post.date}</span>
                    </div>
                    <h3 class="text-xl font-headline font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">${post.title}</h3>
                    <p class="text-sm text-slate-500 font-body line-clamp-2 leading-relaxed">${post.description}</p>
                </div>
            </div>
            <div class="flex-shrink-0 hidden md:block">
               <div class="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                  <span class="material-symbols-outlined text-slate-400 group-hover:text-blue-600 text-sm">arrow_forward</span>
               </div>
            </div>
        </a>
        `;
  });
  postListContainer.innerHTML = html;
}

function renderPost(postId) {
  const post = blogPosts.find(p => p.id === postId);
  if (!post) {
    postContentContainer.innerHTML = `<h2 class="text-2xl font-bold font-headline text-slate-900">Post not found.</h2>`;
    return;
  }

  postContentContainer.innerHTML = `
        <div class="mb-10 border-b border-slate-200 pb-8">
           <span class="inline-block px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold tracking-widest uppercase mb-4 rounded-full">Fingerprint Research ${String(post.index).padStart(2, '0')}</span>
           <h1 class="text-4xl font-headline font-extrabold text-slate-900 mb-4 leading-tight">${post.title}</h1>
           <p class="text-slate-500 text-sm font-medium">Published on ${post.date}</p>
        </div>
        <div class="tailwind-markdown-body">
            ${marked.parse(post.content)}
        </div>
    `;

  if (window.Prism) {
    Prism.highlightAll();
  }
}

window.addEventListener('hashchange', handleRouting);
document.addEventListener('DOMContentLoaded', handleRouting);