const STORAGE_KEY = 'multitenant-saas-demo-state-v1';

const defaultDemoState = {
  tenant: {
    username: 'demo_tenant',
    email: 'tenant@example.com',
    websiteSubdomain: 'demo-tenant',
    websiteUrl: 'https://demo-tenant.prototype.local',
    websiteName: 'Demo Media'
  },
  dashboard: {
    withdrawableBalance: 48500,
    netRevenue: 126000,
    activeSubscriptions: 18,
    pendingTransactions: 4,
    pendingWithdrawal: 20000,
    totalVideos: 8,
    freeVideos: 3,
    premiumVideos: 5,
    lastRefreshed: 'Just now'
  },
  videos: [
    { id: 'vid-1', title: 'City Lights', access: 'Premium', priority: 1, uploadDate: '2026-09-12', status: 'Published', posterColor: '#dbeafe' },
    { id: 'vid-2', title: 'Startup Stories', access: 'Free', priority: 2, uploadDate: '2026-09-08', status: 'Published', posterColor: '#c7d2fe' },
    { id: 'vid-3', title: 'Creator Toolkit', access: 'Premium', priority: 3, uploadDate: '2026-09-03', status: 'Published', posterColor: '#ddd6fe' },
    { id: 'vid-4', title: 'How We Built', access: 'Free', priority: 4, uploadDate: '2026-08-30', status: 'Draft', posterColor: '#e0e7ff' }
  ],
  plans: [
    { id: 'plan-1', name: 'Monthly Premium', cost: 15000, duration: 1, period: 'Monthly' },
    { id: 'plan-2', name: 'Weekly Premium', cost: 6000, duration: 1, period: 'Weekly' },
    { id: 'plan-3', name: 'Daily Access', cost: 3000, duration: 1, period: 'Day' }
  ],
  transactions: [
    { id: 'TX-1042', phone: '255712000111', amount: 15000, status: 'Pending', date: '2026-09-28', provider: 'M-Pesa', verificationState: 'Queued', subscriptionEffect: 'Awaiting activation' },
    { id: 'TX-1043', phone: '255712020222', amount: 25000, status: 'Approved', date: '2026-09-24', provider: 'HaloPesa', verificationState: 'Verified', subscriptionEffect: 'Access granted' },
    { id: 'TX-1044', phone: '255712030333', amount: 12000, status: 'Canceled', date: '2026-09-23', provider: 'TigoPesa', verificationState: 'Canceled', subscriptionEffect: 'No access' },
    { id: 'TX-1045', phone: '255712040444', amount: 17500, status: 'Pending', date: '2026-09-20', provider: 'Airtel Money', verificationState: 'Queued', subscriptionEffect: 'Awaiting activation' }
  ],
  withdrawals: [
    { id: 'WD-5001', amount: 20000, provider: 'M-Pesa', phone: '255712111222', status: 'Pending', date: '2026-09-27', description: 'Pending approval' },
    { id: 'WD-5002', amount: 12000, provider: 'HaloPesa', phone: '255712333444', status: 'Verified', date: '2026-09-22', description: 'Approved by admin' }
  ],
  customization: {
    websiteName: 'Demo Media',
    browserTitle: 'Demo Media',
    heroTitle: 'Watch Premium Content',
    heroSubtitle: 'Explore our collection of videos and unlock access to premium stories.',
    previewDuration: 10,
    navigationColor: '#111827',
    buttonColor: '#2563eb',
    heroColor: '#f3f4f6'
  },
  account: {
    username: 'demo_tenant',
    email: 'tenant@example.com',
    withdrawalPinConfigured: true
  },
  currentPage: 'dashboard',
  loggedIn: false,
  withdrawableBalance: 48500,
  withdrawalPin: '',
  activity: [
    { id: 'act-1', title: 'Payment received', detail: 'TX-1043 · TZS 25,000', meta: '2 hours ago', status: 'success' },
    { id: 'act-2', title: 'Subscription activated', detail: '14 new customer subscriptions', meta: 'Today', status: 'info' },
    { id: 'act-3', title: 'Video uploaded', detail: 'City Lights', meta: 'Yesterday', status: 'warning' },
    { id: 'act-4', title: 'Withdrawal submitted', detail: 'WD-5001 · TZS 20,000', meta: '3 days ago', status: 'success' }
  ]
};

const state = loadState();
let currentPage = state.currentPage || 'dashboard';
let activeModal = null;
let previewTimer = null;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(defaultDemoState);
    return {
      ...structuredClone(defaultDemoState),
      ...saved,
      tenant: { ...structuredClone(defaultDemoState.tenant), ...(saved.tenant || {}) },
      dashboard: { ...structuredClone(defaultDemoState.dashboard), ...(saved.dashboard || {}) },
      videos: saved.videos || [...structuredClone(defaultDemoState.videos)],
      plans: saved.plans || [...structuredClone(defaultDemoState.plans)],
      transactions: saved.transactions || [...structuredClone(defaultDemoState.transactions)],
      withdrawals: saved.withdrawals || [...structuredClone(defaultDemoState.withdrawals)],
      customization: { ...structuredClone(defaultDemoState.customization), ...(saved.customization || {}) },
      account: { ...structuredClone(defaultDemoState.account), ...(saved.account || {}) },
      activity: saved.activity || [...structuredClone(defaultDemoState.activity)]
    };
  } catch (error) {
    console.warn('Failed to load local storage state', error);
    return structuredClone(defaultDemoState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetDemoState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDemoState));
  Object.assign(state, structuredClone(defaultDemoState));
  currentPage = 'dashboard';
  renderApp();
  showToast('Demo data reset successfully.', 'success');
}

function renderApp() {
  renderSidebar();
  renderHeader();
  renderPage();
}

function renderSidebar() {
  const navButtons = document.querySelectorAll('.nav-item');
  navButtons.forEach((button) => {
    const page = button.dataset.page;
    button.classList.toggle('active', page === currentPage);
  });

  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.remove('open');
  }
}

function renderHeader() {
  const profileText = document.querySelector('.profile-button span:nth-of-type(2)');
  if (profileText) {
    profileText.textContent = state.tenant.username || 'Demo Tenant';
  }
}

function renderPage() {
  const pageContent = document.getElementById('page-content');
  if (!pageContent) return;

  const pages = {
    dashboard: renderDashboardPage,
    videos: renderVideosPage,
    plans: renderPlansPage,
    'customize-site': renderCustomizationPage,
    withdrawals: renderWithdrawalsPage,
    transactions: renderTransactionsPage,
    verification: renderVerificationPage,
    'my-account': renderAccountPage,
    'website-preview': renderWebsitePreviewPage
  };

  const renderer = pages[currentPage] || renderDashboardPage;
  pageContent.innerHTML = renderer();
}

function setCurrentPage(pageName) {
  currentPage = pageName;
  state.currentPage = pageName;
  saveState();
  renderApp();
}

function showApp() {
  document.getElementById('app-shell').classList.remove('hidden');
  document.getElementById('login-screen').classList.add('hidden');
  state.loggedIn = true;
  saveState();
}

function showLogin() {
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  state.loggedIn = false;
  saveState();
}

function handleLogin(event) {
  event.preventDefault();
  const form = (event.currentTarget && event.currentTarget.matches && event.currentTarget.matches('#login-form'))
    ? event.currentTarget
    : event.target;

  if (!form || !form.identity || !form.password) {
    showToast('Please enter your username/email and password.', 'error');
    return;
  }

  const identity = form.identity.value.trim();
  const password = form.password.value;

  if (!identity || !password) {
    showToast('Please enter your username/email and password.', 'error');
    return;
  }

  const validIdentity = identity === state.account.username || identity === state.account.email;
  if (!validIdentity) {
    showToast('Demo account not found. Use demo_tenant or tenant@example.com.', 'error');
    return;
  }

  showApp();
  showToast('Login successful. Welcome back.', 'success');
  form.reset();
}

function handleForgotPassword() {
  showToast('Password reset email sent to tenant@example.com.', 'info');
}

function handlePageNavigation(actionTarget) {
  if (!actionTarget) return;
  const pageName = actionTarget.dataset.page;
  if (pageName) {
    setCurrentPage(pageName);
  }
}

function handleProfileMenuToggle() {
  const menu = document.getElementById('profile-menu');
  if (menu) menu.classList.toggle('hidden');
}

function resetProfileMenu() {
  const menu = document.getElementById('profile-menu');
  if (menu) menu.classList.add('hidden');
}

function handleActionClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const action = button.dataset.action;
  const page = button.dataset.page;

  switch (action) {
    case 'goto-page':
      setCurrentPage(page);
      break;
    case 'toggle-sidebar':
      document.getElementById('sidebar').classList.toggle('open');
      break;
    case 'toggle-profile-menu':
      handleProfileMenuToggle();
      break;
    case 'view-website':
      setCurrentPage('website-preview');
      break;
    case 'logout':
      showLogin();
      resetProfileMenu();
      break;
    case 'show-notifications':
      showToast('You have 3 new notifications in your demo workspace.', 'info');
      break;
    case 'forgot-password':
      handleForgotPassword();
      break;
    case 'copy-website-url':
      copyWebsiteLink();
      break;
    case 'refresh-dashboard':
      refreshDashboard();
      break;
    case 'open-upload-video':
      openVideoModal();
      break;
    case 'open-create-plan':
      openPlanModal();
      break;
    case 'open-edit-plan':
      openPlanModal(button.dataset.planId, true);
      break;
    case 'delete-plan':
      openDeletePlanModal(button.dataset.planId);
      break;
    case 'open-customize-save':
      saveWebsiteCustomization();
      break;
    case 'delete-video':
      openDeleteVideoModal(button.dataset.videoId);
      break;
    case 'edit-video':
      openVideoModal(button.dataset.videoId, true);
      break;
    case 'preview-video':
      openPreviewVideoModal(button.dataset.videoId);
      break;
    case 'verify-transaction':
      verifyTransaction(button.dataset.transactionId);
      break;
    case 'view-transaction':
      openTransactionDetail(button.dataset.transactionId);
      break;
    case 'submit-withdrawal':
      handleWithdrawalFormSubmit(button.closest('form'));
      break;
    case 'confirm-withdrawal':
      confirmWithdrawal();
      break;
    case 'set-pin':
      openSetPinModal();
      break;
    case 'save-account':
      saveAccountChanges();
      break;
    case 'save-password':
      saveAccountPassword();
      break;
    case 'reset-demo-state':
      resetDemoState();
      break;
    case 'close-modal':
      closeModal();
      break;
    case 'play-premium-preview':
      startPremiumPreview(button.dataset.videoId || 'preview-demo');
      break;
    case 'toggle-mobile-preview':
      const previewStage = document.querySelector('.preview-stage');
      if (previewStage) previewStage.classList.toggle('mobile');
      break;
    default:
      break;
  }
}

document.addEventListener('click', handleActionClick);
document.addEventListener('submit', (event) => {
  if (event.target.matches('#login-form')) {
    handleLogin(event);
  }
  if (event.target.matches('#video-upload-form')) {
    event.preventDefault();
    handleVideoSubmit(event);
  }
  if (event.target.matches('#plan-form')) {
    event.preventDefault();
    handlePlanSubmit(event);
  }
  if (event.target.matches('#withdrawal-form')) {
    event.preventDefault();
    handleWithdrawalFormSubmit(event.currentTarget);
  }
  if (event.target.matches('#account-profile-form')) {
    event.preventDefault();
    saveAccountChanges();
  }
  if (event.target.matches('#account-password-form')) {
    event.preventDefault();
    saveAccountPassword();
  }
  if (event.target.matches('#customization-form')) {
    event.preventDefault();
    saveWebsiteCustomization();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && activeModal) closeModal();
});

document.addEventListener('click', (event) => {
  const profileMenu = document.getElementById('profile-menu');
  const profileButton = document.querySelector('.profile-button');
  if (profileMenu && !profileMenu.contains(event.target) && !profileButton.contains(event.target)) {
    profileMenu.classList.add('hidden');
  }

  if (event.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}

function openModal(content, options = {}) {
  const root = document.getElementById('modal-root');
  if (!root) return;

  const modalWrap = document.createElement('div');
  modalWrap.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = `modal ${options.size || ''}`.trim();
  modal.innerHTML = content;

  modalWrap.appendChild(modal);
  root.innerHTML = '';
  root.appendChild(modalWrap);
  activeModal = modalWrap;
}

function closeModal() {
  const root = document.getElementById('modal-root');
  if (root) root.innerHTML = '';
  activeModal = null;
}

function getWebsiteUrl() {
  return state.tenant.websiteUrl || 'https://demo-tenant.prototype.local';
}

function copyWebsiteLink() {
  const url = getWebsiteUrl();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url)
      .then(() => showToast('Copied to clipboard.', 'success'))
      .catch(() => showToast('Copy unavailable in this browser.', 'warning'));
  } else {
    showToast('Clipboard access is unavailable in this prototype.', 'warning');
  }
}

function refreshDashboard() {
  state.dashboard.lastRefreshed = 'Just now';
  state.dashboard.pendingTransactions = state.transactions.filter((tx) => tx.status === 'Pending').length;
  state.dashboard.totalVideos = state.videos.length;
  state.dashboard.freeVideos = state.videos.filter((video) => video.access === 'Free').length;
  state.dashboard.premiumVideos = state.videos.filter((video) => video.access === 'Premium').length;
  saveState();
  renderApp();
  showToast('Dashboard refreshed successfully.', 'success');
}

function renderDashboardPage() {
  const withdrawableBalance = state.dashboard.withdrawableBalance || 48500;
  const netRevenue = state.dashboard.netRevenue || 126000;
  const activeSubscriptions = state.dashboard.activeSubscriptions || 18;
  const totalVideos = state.dashboard.totalVideos || state.videos.length;
  const freeVideos = state.dashboard.freeVideos || state.videos.filter((v) => v.access === 'Free').length;
  const premiumVideos = state.dashboard.premiumVideos || state.videos.filter((v) => v.access === 'Premium').length;
  const pendingTransactions = state.transactions.filter((tx) => tx.status === 'Pending').length;
  const pendingWithdrawal = state.withdrawals.filter((wd) => wd.status === 'Pending').length * 20000;

  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>Welcome back, Demo Tenant</h1>
          <p>Manage your videos, subscriptions, website and earnings from one place.</p>
        </div>
        <div class="page-actions">
          <button class="primary-button" type="button" data-action="view-website">View Website</button>
          <button class="secondary-button" type="button" data-action="refresh-dashboard">Refresh</button>
        </div>
      </div>

      <div class="metric-grid">
        ${metricCard('Withdrawable Balance', formatCurrency(withdrawableBalance), 'Available for withdrawal', 'growth-up')}
        ${metricCard('Total Videos', totalVideos, 'Across your site', 'growth-up')}
        ${metricCard('Active Subscriptions', activeSubscriptions, 'Current active plans', 'growth-up')}
        ${metricCard('Net Revenue', formatCurrency(netRevenue), 'Revenue after fees', 'growth-up')}
        ${metricCard('Premium Videos', premiumVideos, 'Unlocked content', 'growth-up')}
        ${metricCard('Free Videos', freeVideos, 'Public catalog', 'growth-up')}
        ${metricCard('Pending Transactions', pendingTransactions, 'Awaiting verification', 'growth-up')}
        ${metricCard('Pending Withdrawal', formatCurrency(Math.max(pendingWithdrawal, 0)), 'Outstanding requests', 'growth-up')}
      </div>

      <div class="dashboard-grid">
        <section class="panel">
          <div class="panel-header">
            <h2>Your Website</h2>
          </div>
          <div class="blue-box">
            <div class="website-link">${state.tenant.websiteUrl || 'https://demo-tenant.prototype.local'}</div>
            <div class="inline-actions">
              <button class="primary-button" type="button" data-action="view-website">Open Website</button>
              <button class="secondary-button" type="button" data-action="copy-website-url">Copy Link</button>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <h2>Recent Activity</h2>
          </div>
          <ul class="activity-list">
            ${state.activity.map(item => `
              <li class="activity-item" data-action="view-website">
                <div class="activity-icon">${item.title.slice(0,1)}</div>
                <div>
                  <div class="activity-title">${item.title}</div>
                  <div class="activity-meta">${item.detail} · ${item.meta}</div>
                </div>
                <span class="status-pill ${item.status}">${item.status === 'success' ? 'Success' : item.status === 'warning' ? 'Update' : 'Info'}</span>
              </li>
            `).join('')}
          </ul>
        </section>
      </div>
    </section>
  `;
}

function metricCard(label, value, subtext, trend) {
  return `
    <article class="metric-card">
      <div class="metric-label">
        <span>${label}</span>
        <span class="${trend}">●</span>
      </div>
      <div class="metric-value">${value}</div>
      <div class="metric-subtext">${subtext}</div>
    </article>
  `;
}

function renderVideosPage() {
  const videos = state.videos;

  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>Videos</h1>
          <p>Manage the videos available on your tenant website.</p>
        </div>
        <div class="page-actions">
          <button class="primary-button" type="button" data-action="open-upload-video">+ Upload Video</button>
        </div>
      </div>

      ${videos.length ? `
        <div class="video-grid">
          ${videos.map(video => `
            <article class="video-card">
              <div class="video-poster" style="background: linear-gradient(135deg, ${video.posterColor || '#dbeafe'}, #c7d2fe);">
                <div class="poster-text">${video.title.charAt(0)}</div>
              </div>
              <div class="video-body">
                <div class="video-topline">
                  <div class="video-title">${video.title}</div>
                  <span class="status-pill ${video.access === 'Premium' ? 'info' : 'success'}">${video.access}</span>
                </div>
                <div class="meta-row">
                  <span>Priority: ${video.priority}</span>
                  <span>Uploaded: ${video.uploadDate}</span>
                  <span>${video.status}</span>
                </div>
                <div class="card-actions">
                  <button class="small-button" type="button" data-action="preview-video" data-video-id="${video.id}">Preview</button>
                  <button class="small-button" type="button" data-action="edit-video" data-video-id="${video.id}">Edit</button>
                  <button class="warning-button" type="button" data-action="delete-video" data-video-id="${video.id}">Delete</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div>
            <h3>No videos yet</h3>
            <p>Upload your first video to start building your website.</p>
            <button class="primary-button" type="button" data-action="open-upload-video">Upload Video</button>
          </div>
        </div>
      `}
    </section>
  `;
}

function renderPlansPage() {
  const plans = state.plans;

  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>Plans</h1>
          <p>Manage subscription access for your customers.</p>
        </div>
        <div class="page-actions">
          <button class="primary-button" type="button" data-action="open-create-plan">+ Create Plan</button>
        </div>
      </div>

      ${plans.length ? `
        <div class="plan-grid">
          ${plans.map(plan => `
            <article class="plan-card">
              <div class="plan-body">
                <div class="plan-topline">
                  <div class="plan-name">${plan.name}</div>
                  <span class="status-pill info">${plan.period}</span>
                </div>
                <div class="metric-value" style="font-size:1.7rem; margin: 14px 0 8px;">TZS ${formatNumber(plan.cost)}</div>
                <div class="meta-row">
                  <span>Duration: ${plan.duration} ${plan.period}</span>
                </div>
                <p style="margin: 12px 0 8px; color: var(--text-soft);">Access: ✓ All premium videos</p>
                <div class="card-actions">
                  <button class="small-button" type="button" data-action="open-edit-plan" data-plan-id="${plan.id}">Edit</button>
                  <button class="warning-button" type="button" data-action="delete-plan" data-plan-id="${plan.id}">Delete</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div>
            <h3>No subscription plans</h3>
            <p>Create a plan to allow customers to access premium videos.</p>
            <button class="primary-button" type="button" data-action="open-create-plan">Create Plan</button>
          </div>
        </div>
      `}
    </section>
  `;
}

function renderCustomizationPage() {
  const customization = state.customization;

  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>Customize Site</h1>
          <p>Adjust the content and style for the preview website.</p>
        </div>
      </div>

      <div class="customize-layout">
        <form id="customization-form" class="panel">
          <div class="panel-header">
            <h2>Customization Controls</h2>
          </div>

          <div class="form-grid">
            <label>
              Website Name
              <input type="text" name="websiteName" value="${customization.websiteName}" />
            </label>
            <label>
              Browser Tab Title
              <input type="text" name="browserTitle" value="${customization.browserTitle}" />
            </label>
            <label>
              Hero Title
              <input type="text" name="heroTitle" value="${customization.heroTitle}" />
            </label>
            <label>
              Preview Duration (seconds)
              <input type="number" name="previewDuration" min="5" max="30" value="${customization.previewDuration}" />
            </label>
            <label>
              Navigation Color
              <input type="color" name="navigationColor" value="${customization.navigationColor}" />
            </label>
            <label>
              Button Color
              <input type="color" name="buttonColor" value="${customization.buttonColor}" />
            </label>
            <label style="grid-column: 1 / -1;">
              Hero Subtitle
              <textarea name="heroSubtitle">${customization.heroSubtitle}</textarea>
            </label>
            <label style="grid-column: 1 / -1;">
              Hero Section Color
              <input type="color" name="heroColor" value="${customization.heroColor}" />
            </label>
          </div>

          <div class="form-actions">
            <button class="secondary-button" type="button" data-action="toggle-mobile-preview">Toggle Mobile Preview</button>
            <button class="primary-button" type="submit">Save Changes</button>
          </div>
        </form>

        <div class="panel">
          <div class="panel-header">
            <h2>Live Website Preview</h2>
          </div>
          <div class="preview-stage">
            <div class="preview-header" style="background: ${customization.navigationColor};">
              <div class="preview-brand">${customization.websiteName}</div>
              <div class="preview-nav">
                <span>Home</span>
                <span>Plans</span>
                <span>Videos</span>
              </div>
            </div>

            <div class="preview-hero" style="background: ${customization.heroColor}; color: #0f172a;">
              <div>
                <h3>${customization.heroTitle}</h3>
                <p>${customization.heroSubtitle}</p>
                <div class="inline-actions" style="justify-content:center; margin-top:16px;">
                  <button type="button" class="primary-button" style="background:${customization.buttonColor};">Subscribe</button>
                </div>
              </div>
            </div>

            <div class="preview-videos">
              ${state.videos.slice(0, 4).map((video, index) => `
                <div class="preview-video-card">
                  <div class="preview-video-thumb ${video.access === 'Premium' ? 'premium' : ''}" style="background: linear-gradient(135deg, ${video.posterColor || '#dbeafe'}, #e2e8f0);">
                    ${video.access === 'Premium' ? 'Premium' : 'Free'}
                  </div>
                  <div class="preview-video-body">
                    <h4>${video.title}</h4>
                    <button type="button" class="play-button" style="background:${customization.buttonColor};">Play</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderWithdrawalsPage() {
  const withdrawals = state.withdrawals;
  const requested = state.withdrawableBalance || 48500;
  const formAmount = 20000;

  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>Withdrawals</h1>
          <p>Submit and review withdrawal requests for your tenant account.</p>
        </div>
      </div>

      <div class="withdrawal-layout">
        <div>
          <div class="balance-card">
            <h3>Withdrawable Balance</h3>
            <div class="balance-amount">TZS ${formatNumber(requested)}</div>
            <div class="balance-note">Fee applies at 20% of requested amount. Demo behavior only.</div>
          </div>

          <div class="pin-box" style="margin-top:18px;">
            <div class="panel-header" style="margin-bottom:12px;">
              <h3>Withdrawal PIN</h3>
            </div>
            <p style="margin:0 0 14px; color: var(--text-soft);">Used to authorize withdrawal requests.</p>
            <button class="secondary-button" type="button" data-action="set-pin">Set Withdrawal PIN</button>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <h2>Withdrawal Form</h2>
          </div>
          <form id="withdrawal-form">
            <div class="form-grid">
              <label>
                Amount
                <input type="number" name="amount" min="5000" max="50000" value="20000" />
              </label>
              <label>
                Provider
                <select name="provider">
                  <option value="">Select provider</option>
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="HaloPesa">HaloPesa</option>
                  <option value="TigoPesa">TigoPesa</option>
                  <option value="Airtel Money">Airtel Money</option>
                </select>
              </label>
              <label style="grid-column: 1 / -1;">
                Destination Phone Number
                <input type="tel" name="phone" placeholder="255712345678" value="255712345678" />
              </label>
              <label>
                Withdrawal PIN
                <input type="password" name="pin" placeholder="4 digits" maxlength="4" inputmode="numeric" />
              </label>
            </div>

            <div class="summary-row" style="margin-top:18px;"><span class="summary-label">Requested</span><strong>TZS ${formatNumber(formAmount)}</strong></div>
            <div class="summary-row"><span class="summary-label">Fee</span><strong>TZS ${formatNumber(Math.round(formAmount * 0.2))}</strong></div>
            <div class="summary-row"><span class="summary-label">Net amount</span><strong>TZS ${formatNumber(formAmount - Math.round(formAmount * 0.2))}</strong></div>

            <div class="form-actions">
              <button class="primary-button" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <div class="panel" style="margin-top:22px;">
        <div class="panel-header">
          <h2>Recent Withdrawals</h2>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Provider</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${withdrawals.map((item) => `
                <tr>
                  <td>${item.id}</td>
                  <td>${item.provider}</td>
                  <td>${item.phone}</td>
                  <td>TZS ${formatNumber(item.amount)}</td>
                  <td><span class="status-pill ${item.status === 'Verified' ? 'success' : item.status === 'Pending' ? 'warning' : 'danger'}">${item.status}</span></td>
                  <td>${item.date}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderTransactionsPage() {
  const filter = state.transactionFilter || 'All';
  const term = (state.transactionSearch || '').toLowerCase();
  const filtered = state.transactions.filter((tx) => {
    const matchesFilter = filter === 'All' || tx.status === filter;
    const matchesText = !term || tx.id.toLowerCase().includes(term) || tx.phone.toLowerCase().includes(term);
    return matchesFilter && matchesText;
  });

  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>Transaction History</h1>
          <p>Track payments received by your tenant website.</p>
        </div>
      </div>

      <div class="panel">
        <div class="search-bar">
          <input type="search" id="transaction-search" placeholder="Search by transaction ID or phone" value="${state.transactionSearch || ''}" />
          <div class="filter-group">
            ${['All', 'Pending', 'Approved', 'Canceled'].map((filterName) => `
              <button class="filter-chip ${filter === filterName ? 'active' : ''}" type="button" data-action="filter-transactions" data-status="${filterName}">${filterName}</button>
            `).join('')}
          </div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length ? filtered.map((tx) => `
                <tr>
                  <td>${tx.id}</td>
                  <td>${tx.phone}</td>
                  <td>TZS ${formatNumber(tx.amount)}</td>
                  <td><span class="status-pill ${tx.status === 'Approved' ? 'success' : tx.status === 'Pending' ? 'warning' : 'danger'}">${tx.status}</span></td>
                  <td>${tx.date}</td>
                  <td><button class="action-link" type="button" data-action="view-transaction" data-transaction-id="${tx.id}">View</button></td>
                </tr>
              `).join('') : `<tr><td colspan="6">No transactions found.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderVerificationPage() {
  const pending = state.transactions.filter((tx) => tx.status === 'Pending');

  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>Transaction Verification</h1>
          <p>Pending transactions awaiting confirmation from the payment system.</p>
        </div>
        <div class="page-actions">
          <button class="secondary-button" type="button" data-action="refresh-dashboard">Check Now</button>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h2>Pending Transactions</h2>
          <span class="status-pill info">Automatic verification active</span>
        </div>
        <p style="color: var(--muted); margin: 0 0 18px;">Last checked: a few seconds ago</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${pending.length ? pending.map((tx) => `
                <tr>
                  <td>${tx.id}</td>
                  <td>${tx.phone}</td>
                  <td>TZS ${formatNumber(tx.amount)}</td>
                  <td>${tx.date}</td>
                  <td><span class="status-pill warning">${tx.status}</span></td>
                  <td><button class="primary-button" type="button" data-action="verify-transaction" data-transaction-id="${tx.id}">Verify</button></td>
                </tr>
              `).join('') : `<tr><td colspan="6">No pending transactions.</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function renderAccountPage() {
  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>My Account</h1>
          <p>Update your tenant profile and security details.</p>
        </div>
      </div>

      <div class="account-grid">
        <div class="account-card">
          <h3>Profile</h3>
          <form id="account-profile-form">
            <label>
              Username
              <input type="text" name="username" value="${state.account.username}" />
            </label>
            <label>
              Email
              <input type="email" name="email" value="${state.account.email}" />
            </label>
            <div class="form-actions" style="justify-content: flex-start; margin-top: 14px;">
              <button class="primary-button" type="submit">Save Profile</button>
            </div>
          </form>
        </div>

        <div class="account-card">
          <h3>Password</h3>
          <form id="account-password-form">
            <label>
              Current Password
              <input type="password" name="currentPassword" placeholder="Current password" />
            </label>
            <label>
              New Password
              <input type="password" name="newPassword" placeholder="New password" />
            </label>
            <label>
              Confirm Password
              <input type="password" name="confirmPassword" placeholder="Confirm new password" />
            </label>
            <div class="form-actions" style="justify-content: flex-start; margin-top: 14px;">
              <button class="primary-button" type="submit">Update Password</button>
            </div>
          </form>
        </div>
      </div>

      <div class="account-card" style="margin-top: 20px;">
        <h3>Account Security</h3>
        <ul class="security-list">
          <li><span>Username</span><strong>${state.account.username}</strong></li>
          <li><span>Email</span><strong>${state.account.email}</strong></li>
          <li><span>Withdrawal PIN</span><strong>${state.account.withdrawalPinConfigured ? 'Configured' : 'Not set'}</strong></li>
        </ul>
      </div>
    </section>
  `;
}

function renderWebsitePreviewPage() {
  const customization = state.customization;
  const videos = state.videos;

  return `
    <section class="page-content">
      <div class="page-header">
        <div>
          <h1>Preview Tenant Website</h1>
          <p>Customer-facing website as it appears for visitors.</p>
        </div>
        <div class="page-actions">
          <button class="secondary-button" type="button" data-action="toggle-mobile-preview">Toggle Mobile</button>
        </div>
      </div>

      <div class="panel">
        <div class="preview-stage ${document.querySelector('.preview-stage')?.classList.contains('mobile') ? 'mobile' : ''}">
          <div class="preview-header" style="background: ${customization.navigationColor};">
            <div class="preview-brand">${customization.websiteName}</div>
            <div class="preview-nav">
              <span>Home</span>
              <span>Plans</span>
              <span>Videos</span>
            </div>
          </div>

          <div class="preview-hero" style="background: ${customization.heroColor}; color: #0f172a;">
            <div>
              <h3>${customization.heroTitle}</h3>
              <p>${customization.heroSubtitle}</p>
              <div class="inline-actions" style="justify-content:center; margin-top:16px;">
                <button type="button" class="primary-button" style="background:${customization.buttonColor};">Subscribe</button>
              </div>
            </div>
          </div>

          <div class="preview-videos">
            ${videos.map((video) => `
              <div class="preview-video-card">
                <div class="preview-video-thumb ${video.access === 'Premium' ? 'premium' : ''}" style="background: linear-gradient(135deg, ${video.posterColor || '#dbeafe'}, #e2e8f0);">
                  ${video.access === 'Premium' ? 'Premium' : 'Free'}
                </div>
                <div class="preview-video-body">
                  <h4>${video.title}</h4>
                  <button type="button" class="play-button" data-action="play-premium-preview" data-video-id="${video.id}" style="background:${customization.buttonColor};">${video.access === 'Premium' ? 'Preview' : 'Play'}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function saveWebsiteCustomization() {
  const form = document.getElementById('customization-form');
  if (!form) return;

  const formData = new FormData(form);
  state.customization = {
    websiteName: formData.get('websiteName') || 'Demo Media',
    browserTitle: formData.get('browserTitle') || 'Demo Media',
    heroTitle: formData.get('heroTitle') || 'Watch Premium Content',
    heroSubtitle: formData.get('heroSubtitle') || 'Explore our collection of videos.',
    previewDuration: Number(formData.get('previewDuration')) || 10,
    navigationColor: formData.get('navigationColor') || '#111827',
    buttonColor: formData.get('buttonColor') || '#2563eb',
    heroColor: formData.get('heroColor') || '#f3f4f6'
  };

  saveState();
  renderApp();
  showToast('Website customization saved.', 'success');
}

function openVideoModal(videoId, isEdit = false) {
  const video = state.videos.find((item) => item.id === videoId);
  const modalTitle = isEdit ? 'Edit Video' : 'Upload Video';

  const formContent = `
    <div class="modal-header">
      <h3>${modalTitle}</h3>
      <button type="button" class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body">
      <form id="video-upload-form">
        <input type="hidden" name="videoId" value="${video ? video.id : ''}" />
        <input type="hidden" name="isEdit" value="${isEdit ? 'true' : 'false'}" />
        <div class="form-grid">
          <label style="grid-column: 1 / -1;">
            Video Title
            <input type="text" name="title" value="${video ? video.title : ''}" placeholder="Enter video title" required />
          </label>
          <label>
            Video File
            <input type="file" name="videoFile" accept="video/mp4" ${video ? '' : 'required'} />
          </label>
          <label>
            Poster Image
            <input type="file" name="posterFile" accept="image/jpeg,image/jpg,image/png,image/webp" />
          </label>
          <label>
            Priority
            <input type="number" name="priority" min="1" max="10" value="${video ? video.priority : 1}" required />
          </label>
          <label>
            Access Type
            <select name="access">
              <option value="Free" ${video && video.access === 'Free' ? 'selected' : ''}>Free</option>
              <option value="Premium" ${video && video.access === 'Premium' ? 'selected' : ''}>Premium</option>
            </select>
          </label>
        </div>

        <div style="margin-top:14px; color: var(--muted); font-size:0.9rem; line-height:1.6;">
          Maximum size: 50 MB<br />
          Video format: MP4<br />
          Poster format: MPEG/JPEG
        </div>

        <div class="progress-shell" id="upload-progress-shell">
          <div class="progress-bar" id="upload-progress-bar"></div>
        </div>

        <div class="modal-footer">
          <button type="button" class="secondary-button" data-action="close-modal">Cancel</button>
          <button type="submit" class="primary-button">${isEdit ? 'Save Changes' : 'Upload Video'}</button>
        </div>
      </form>
    </div>
  `;

  openModal(formContent, { size: 'lg' });
}

function handleVideoSubmit(event) {
  const form = event.target;
  const title = form.title.value.trim();
  const videoFile = form.videoFile.files[0];
  const posterFile = form.posterFile.files[0];
  const priority = Number(form.priority.value);
  const access = form.access.value;
  const isEdit = form.isEdit.value === 'true';

  if (!title) {
    showToast('Video title is required.', 'error');
    return;
  }

  if (!isEdit && !videoFile) {
    showToast('Please choose a video file.', 'error');
    return;
  }

  if (!isEdit && videoFile && !videoFile.name.toLowerCase().endsWith('.mp4')) {
    showToast('Video must be MP4.', 'error');
    return;
  }

  if (videoFile && videoFile.size > 50 * 1024 * 1024) {
    showToast('Maximum video size is 50 MB.', 'error');
    return;
  }

  if (posterFile && !['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(posterFile.type)) {
    showToast('Poster image format is not supported.', 'error');
    return;
  }

  if (!priority || priority < 1 || priority > 10) {
    showToast('Priority must be a valid value between 1 and 10.', 'error');
    return;
  }

  const progressBar = document.getElementById('upload-progress-bar');
  const shell = document.getElementById('upload-progress-shell');
  if (progressBar && shell) {
    shell.classList.remove('hidden');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          saveVideoToState({ title, access, priority, isEdit, videoFile, posterFile });
          closeModal();
          renderApp();
          showToast(isEdit ? 'Video updated successfully.' : 'Video uploaded successfully.', 'success');
        }, 250);
      }
    }, 120);
  } else {
    saveVideoToState({ title, access, priority, isEdit, videoFile, posterFile });
    closeModal();
    renderApp();
    showToast(isEdit ? 'Video updated successfully.' : 'Video uploaded successfully.', 'success');
  }
}

function saveVideoToState({ title, access, priority, isEdit, videoFile, posterFile }) {
  if (isEdit) {
    const videoId = document.querySelector('input[name="videoId"]').value;
    const index = state.videos.findIndex((item) => item.id === videoId);
    if (index !== -1) {
      const existing = state.videos[index];
      state.videos[index] = { ...existing, title, access, priority, status: 'Published', uploadDate: existing.uploadDate || '2026-09-28' };
    }
  } else {
    const newId = `vid-${Date.now()}`;
    state.videos.unshift({
      id: newId,
      title,
      access,
      priority,
      uploadDate: new Date().toISOString().slice(0, 10),
      status: 'Published',
      posterColor: ['#dbeafe', '#c7d2fe', '#e0e7ff', '#ddd6fe'][Math.floor(Math.random() * 4)]
    });
  }
	state.dashboard.totalVideos = state.videos.length;
  state.dashboard.freeVideos = state.videos.filter((v) => v.access === 'Free').length;
  state.dashboard.premiumVideos = state.videos.filter((v) => v.access === 'Premium').length;
  saveState();
}

function openDeleteVideoModal(videoId) {
  const video = state.videos.find((item) => item.id === videoId);
  if (!video) return;

  const hasActiveAccess = Math.random() > 0.5;
  const body = hasActiveAccess
    ? `<p>This video is still associated with active customer subscription access. Deletion cannot immediately remove the resource.</p>`
    : `<p>This action removes the video from the website catalog.</p>`;

  openModal(`
    <div class="modal-header">
      <h3>Delete Video?</h3>
      <button type="button" class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body">
      <p>${body}</p>
      <div class="form-actions" style="justify-content:flex-end; margin-top: 18px;">
        <button type="button" class="secondary-button" data-action="close-modal">Cancel</button>
        <button type="button" class="danger-button" data-video-id="${videoId}" data-action="${hasActiveAccess ? 'close-modal' : 'confirm-video-delete'}">${hasActiveAccess ? 'Continue' : 'Delete Video'}</button>
      </div>
    </div>
  `);
}

document.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]');
  if (!action) return;
  if (action.dataset.action === 'confirm-video-delete') {
    const videoId = action.dataset.videoId;
    state.videos = state.videos.filter((video) => video.id !== videoId);
    saveState();
    renderApp();
    showToast('Video deleted successfully.', 'success');
    closeModal();
  }
});

function openPlanModal(planId = '', isEdit = false) {
  const plan = state.plans.find((item) => item.id === planId);
  openModal(`
    <div class="modal-header">
      <h3>${isEdit ? 'Edit Plan' : 'Create Plan'}</h3>
      <button type="button" class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body">
      <form id="plan-form">
        <input type="hidden" name="planId" value="${plan ? plan.id : ''}" />
        <input type="hidden" name="isEdit" value="${isEdit ? 'true' : 'false'}" />
        <div class="form-grid">
          <label style="grid-column: 1 / -1;">
            Plan Name
            <input type="text" name="name" value="${plan ? plan.name : ''}" required />
          </label>
          <label>
            Cost
            <input type="number" name="cost" min="1" value="${plan ? plan.cost : 15000}" required />
          </label>
          <label>
            Duration
            <input type="number" name="duration" min="1" value="${plan ? plan.duration : 1}" required />
          </label>
          <label style="grid-column: 1 / -1;">
            Time Period
            <select name="period">
              <option value="Day" ${plan && plan.period === 'Day' ? 'selected' : ''}>Day</option>
              <option value="Weekly" ${plan && plan.period === 'Weekly' ? 'selected' : ''}>Weekly</option>
              <option value="Monthly" ${plan && plan.period === 'Monthly' ? 'selected' : ''}>Monthly</option>
            </select>
          </label>
        </div>

        ${isEdit ? `<div class="warning-button" style="margin-top:18px; padding:12px; display:block;">Changes to this plan apply to new subscribers. Existing subscriptions keep their existing subscription terms.</div>` : ''}

        <div class="modal-footer">
          <button type="button" class="secondary-button" data-action="close-modal">Cancel</button>
          <button type="submit" class="primary-button">${isEdit ? 'Save Plan' : 'Create Plan'}</button>
        </div>
      </form>
    </div>
  `);
}

function handlePlanSubmit(event) {
  const form = event.target;
  const name = form.name.value.trim();
  const cost = Number(form.cost.value);
  const duration = Number(form.duration.value);
  const period = form.period.value;
  const isEdit = form.isEdit.value === 'true';

  if (!name || !cost || !duration || cost <= 0 || duration <= 0) {
    showToast('Plan name, cost and duration are required and must be positive.', 'error');
    return;
  }

  if (isEdit) {
    const planId = form.planId.value;
    const index = state.plans.findIndex((plan) => plan.id === planId);
    if (index !== -1) {
      state.plans[index] = { ...state.plans[index], name, cost, duration, period };
    }
    showToast('Plan updated successfully.', 'success');
  } else {
    state.plans.push({ id: `plan-${Date.now()}`, name, cost, duration, period });
    showToast('Plan created successfully.', 'success');
  }

  saveState();
  closeModal();
  renderApp();
}

function openDeletePlanModal(planId) {
  const plan = state.plans.find((item) => item.id === planId);
  if (!plan) return;

  openModal(`
    <div class="modal-header">
      <h3>Delete this plan?</h3>
      <button type="button" class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body">
      <p>The plan will no longer be available to new subscribers. Existing subscribers will continue until their subscription expires.</p>
      <div class="modal-footer">
        <button type="button" class="secondary-button" data-action="close-modal">Cancel</button>
        <button type="button" class="danger-button" data-action="confirm-delete-plan" data-plan-id="${planId}">Delete Plan</button>
      </div>
    </div>
  `);
}

document.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]');
  if (!action) return;
  if (action.dataset.action === 'confirm-delete-plan') {
    const planId = action.dataset.planId;
    state.plans = state.plans.filter((plan) => plan.id !== planId);
    saveState();
    renderApp();
    showToast('Plan removed from new subscriptions.', 'success');
    closeModal();
  }
});

function openTransactionDetail(transactionId) {
  const tx = state.transactions.find((item) => item.id === transactionId);
  if (!tx) return;

  openModal(`
    <div class="modal-header">
      <h3>Transaction Details</h3>
      <button type="button" class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body">
      <div class="summary-row"><span class="summary-label">Transaction ID</span><strong>${tx.id}</strong></div>
      <div class="summary-row"><span class="summary-label">Phone</span><strong>${tx.phone}</strong></div>
      <div class="summary-row"><span class="summary-label">Amount</span><strong>TZS ${formatNumber(tx.amount)}</strong></div>
      <div class="summary-row"><span class="summary-label">Status</span><strong>${tx.status}</strong></div>
      <div class="summary-row"><span class="summary-label">Date</span><strong>${tx.date}</strong></div>
      <div class="summary-row"><span class="summary-label">Provider Reference</span><strong>${tx.provider || 'M-Pesa'}</strong></div>
      <div class="summary-row"><span class="summary-label">Verification State</span><strong>${tx.verificationState || 'Pending'}</strong></div>
      <div class="summary-row"><span class="summary-label">Subscription Effect</span><strong>${tx.subscriptionEffect || 'Awaiting activation'}</strong></div>
    </div>
  `);
}

function verifyTransaction(transactionId) {
  const tx = state.transactions.find((item) => item.id === transactionId);
  if (!tx) return;

  tx.status = 'Approved';
  tx.verificationState = 'Verified';
  tx.subscriptionEffect = 'Access granted';
  state.dashboard.activeSubscriptions = (state.dashboard.activeSubscriptions || 18) + 2;
  state.dashboard.pendingTransactions = state.transactions.filter((item) => item.status === 'Pending').length;
  saveState();
  renderApp();
  showToast('Transaction verified successfully.', 'success');
}

function openPreviewVideoModal(videoId) {
  const video = state.videos.find((item) => item.id === videoId);
  if (!video) return;

  const isPremium = video.access === 'Premium';
  openModal(`
    <div class="modal-header">
      <h3>${video.title}</h3>
      <button type="button" class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body preview-dialog">
      <div class="preview-video-frame">
        <div>
          <div class="preview-lock">${isPremium ? '🔒' : '▶'}</div>
          <div class="preview-timer">${isPremium ? 'Preview remaining: 00:10' : 'Ready to play'}</div>
        </div>
      </div>
      <div>
        <div class="summary-row"><span class="summary-label">Status</span><strong>${video.access}</strong></div>
        <div class="summary-row"><span class="summary-label">Priority</span><strong>${video.priority}</strong></div>
      </div>
      <div class="preview-actions">
        <button type="button" class="secondary-button" data-action="close-modal">Close</button>
        ${isPremium ? '<button type="button" class="primary-button" data-action="view-website">View Plans</button>' : ''}
      </div>
    </div>
  `);
}

function startPremiumPreview() {
  const duration = Number(state.customization.previewDuration || 10);
  const previewFrame = document.querySelector('.preview-video-frame');
  if (!previewFrame) return;

  let remaining = duration;
  previewFrame.innerHTML = `<div><div class="preview-lock">▶</div><div class="preview-timer">Preview remaining: 00:${String(remaining).padStart(2, '0')}</div></div>`;

  clearInterval(previewTimer);
  previewTimer = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(previewTimer);
      previewFrame.innerHTML = `<div><div class="preview-lock">⏱</div><div class="preview-timer">Preview ended</div><div style="margin-top:12px; color:#e2e8f0;">Subscribe to continue watching.</div></div>`;
      showToast('Preview ended. Subscription required to continue watching.', 'warning');
      return;
    }
    previewFrame.innerHTML = `<div><div class="preview-lock">▶</div><div class="preview-timer">Preview remaining: 00:${String(remaining).padStart(2, '0')}</div></div>`;
  }, 1000);
}

function handleWithdrawalFormSubmit(form) {
  const amount = Number(form.amount.value);
  const provider = form.provider.value;
  const phone = form.phone.value.trim();
  const pin = form.pin.value.trim();

  if (!amount || amount < 5000 || amount > 50000) {
    showToast('Please enter a valid withdrawal amount between TZS 5,000 and TZS 50,000.', 'error');
    return;
  }

  if (amount > state.withdrawableBalance) {
    showToast('Withdrawal amount cannot exceed the demo withdrawable balance.', 'error');
    return;
  }

  if (!provider) {
    showToast('Please select a provider.', 'error');
    return;
  }

  if (!phone) {
    showToast('Please provide a destination phone number.', 'error');
    return;
  }

  if (!/^[0-9]{4}$/.test(pin)) {
    showToast('Incorrect withdrawal PIN. Please enter a 4-digit PIN.', 'error');
    return;
  }

  const fee = Math.round(amount * 0.2);
  const net = amount - fee;
  const summary = `
    <div class="modal-header">
      <h3>Confirm Withdrawal</h3>
      <button type="button" class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body">
      <div class="summary-row"><span class="summary-label">Amount</span><strong>TZS ${formatNumber(amount)}</strong></div>
      <div class="summary-row"><span class="summary-label">Provider</span><strong>${provider}</strong></div>
      <div class="summary-row"><span class="summary-label">Phone</span><strong>${phone}</strong></div>
      <div class="summary-row"><span class="summary-label">Fee</span><strong>TZS ${formatNumber(fee)}</strong></div>
      <div class="summary-row"><span class="summary-label">Net amount</span><strong>TZS ${formatNumber(net)}</strong></div>
      <p style="margin-top:18px;">Once submitted, this withdrawal cannot be canceled.</p>
      <div class="modal-footer">
        <button type="button" class="secondary-button" data-action="close-modal">Cancel</button>
        <button type="button" class="primary-button" data-action="confirm-withdrawal">Confirm Withdrawal</button>
      </div>
    </div>
  `;

  openModal(summary, { size: 'lg' });
}

function confirmWithdrawal() {
  const form = document.getElementById('withdrawal-form');
  if (!form) return;

  const amount = Number(form.amount.value);
  const provider = form.provider.value;
  const phone = form.phone.value.trim();
  const date = new Date().toISOString().slice(0, 10);

  state.withdrawals.unshift({
    id: `WD-${Date.now()}`,
    amount,
    provider,
    phone,
    status: 'Pending',
    date,
    description: 'Pending approval'
  });

  state.dashboard.withdrawableBalance = Math.max((state.dashboard.withdrawableBalance || 48500) - amount, 0);
  state.withdrawableBalance = state.dashboard.withdrawableBalance;
  saveState();
  closeModal();
  renderApp();
  showToast('Withdrawal submitted successfully.', 'success');
}

function openSetPinModal() {
  openModal(`
    <div class="modal-header">
      <h3>Set Withdrawal PIN</h3>
      <button type="button" class="modal-close" data-action="close-modal" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body">
      <p>This prototype requires a 4-digit withdrawal PIN. It is stored only in demo state and is never a mobile-money account PIN.</p>
      <label>
        New PIN
        <input type="password" maxlength="4" inputmode="numeric" id="set-pin-input" placeholder="1234" />
      </label>
      <div class="modal-footer">
        <button type="button" class="secondary-button" data-action="close-modal">Cancel</button>
        <button type="button" class="primary-button" data-action="save-pin">Save PIN</button>
      </div>
    </div>
  `);
}

document.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]');
  if (!action) return;
  if (action.dataset.action === 'save-pin') {
    const pinInput = document.getElementById('set-pin-input');
    if (!pinInput || !/^[0-9]{4}$/.test(pinInput.value.trim())) {
      showToast('A 4-digit PIN is required.', 'error');
      return;
    }
    state.account.withdrawalPinConfigured = true;
    saveState();
    closeModal();
    renderApp();
    showToast('Withdrawal PIN saved successfully.', 'success');
  }
});

function saveAccountChanges() {
  const form = document.getElementById('account-profile-form');
  if (!form) return;

  const username = form.username.value.trim();
  const email = form.email.value.trim();

  if (!username || !email) {
    showToast('Username and email are required.', 'error');
    return;
  }

  state.account.username = username;
  state.account.email = email;
  state.tenant.username = username;
  state.tenant.email = email;
  saveState();
  renderApp();
  showToast('Account updated successfully.', 'success');
}

function saveAccountPassword() {
  const form = document.getElementById('account-password-form');
  if (!form) return;

  const currentPassword = form.currentPassword.value;
  const newPassword = form.newPassword.value;
  const confirmPassword = form.confirmPassword.value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    showToast('Please complete all password fields.', 'error');
    return;
  }

  if (newPassword !== confirmPassword) {
    showToast('Password confirmation does not match.', 'error');
    return;
  }

  if (newPassword.length < 6) {
    showToast('New password must be at least 6 characters.', 'error');
    return;
  }

  form.reset();
  showToast('Password updated successfully.', 'success');
}

document.addEventListener('input', (event) => {
  if (event.target.matches('#transaction-search')) {
    state.transactionSearch = event.target.value.trim();
    saveState();
    renderApp();
  }

  if (event.target.matches('[data-action="filter-transactions"]')) {
    return;
  }
});

document.addEventListener('click', (event) => {
  const filterChip = event.target.closest('[data-action="filter-transactions"]');
  if (!filterChip) return;
  state.transactionFilter = filterChip.dataset.status || 'All';
  saveState();
  renderApp();
});

function formatNumber(value) {
  return Number(value).toLocaleString('en-US');
}

function formatCurrency(value) {
  return `TZS ${formatNumber(value)}`;
}

window.addEventListener('DOMContentLoaded', () => {
  renderApp();

  const appShell = document.getElementById('app-shell');
  if (appShell && state.loggedIn) {
    showApp();
  } else {
    showLogin();
  }
});

window.addEventListener('beforeunload', () => {
  if (state.currentPage) {
    state.currentPage = currentPage;
    saveState();
  }
});

function ensureViewWebsiteModal() {
  const previewStage = document.querySelector('.preview-stage.mobile');
  if (previewStage) {
    previewStage.classList.toggle('mobile');
  }
}

if (typeof module !== 'undefined') {
  module.exports = { defaultDemoState };
}

console.log('Prototype initialized');
