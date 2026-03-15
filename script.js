window.onload = function() {
  // ========== 1. 统一获取元素（修复重复声明+漏声明） ==========
  const elements = {
    bgImg: document.getElementById("bgImg"),
    back: document.getElementById("back"),
    downloadGame: document.getElementById("download"),
    downloadMod: document.getElementById("download_mod"),
    downloadModCode: document.getElementById("download_mod_code"),
    updateLogBtn: document.getElementById("update_log_btn"),
    title: document.getElementById("title"),
    versioninfo: document.getElementById("versioninfo"),
    disclaimer: document.getElementById("disclaimer"),
    usageGuide: document.getElementById("usage_guide"),
    qqGroups: document.getElementById("qq_groups"),
    feedbackEmail: document.getElementById("feedback_email"),
    originalCredit: document.getElementById("original_credit")
  };

  // ========== 2. 初始化变量 ==========
  let upperTimer = null;
  let isClicked = false;
  // 统一管理需要显示/隐藏的文字模块
  const textModules = [
    elements.title, elements.versioninfo, elements.disclaimer,
    elements.usageGuide, elements.qqGroups, elements.feedbackEmail,
    elements.originalCredit, elements.updateLogBtn
  ];
  // 统一管理下载MOD相关按钮
  const modButtons = [elements.downloadMod, elements.downloadModCode];

  // ========== 3. 封装通用函数（减少冗余代码） ==========
  // 隐藏所有文字模块
  const hideAllTextModules = () => {
    textModules.forEach(el => el && (el.style.display = "none"));
  };
  // 显示所有文字模块
  const showAllTextModules = () => {
    textModules.forEach(el => el && (el.style.display = "block"));
  };
  // 显示/隐藏MOD下载按钮
  const toggleModButtons = (isShow) => {
    modButtons.forEach(el => el && (el.style.display = isShow ? "block" : "none"));
  };
  // 锁定/解锁上半区显示状态
  const lockUpperArea = (isLock) => {
    isClicked = isLock;
    if (isLock) {
      elements.bgImg.classList.remove("none");
      elements.bgImg.classList.add("show");
      elements.back.style.display = "block";
      elements.downloadGame.style.display = "block";
      toggleModButtons(false);
      hideAllTextModules();
    } else {
      elements.bgImg.classList.remove("show");
      elements.bgImg.classList.add("none");
      elements.back.style.display = "none";
      elements.downloadGame.style.display = "none";
      toggleModButtons(true);
      showAllTextModules();
    }
  };

  // ========== 4. 鼠标移动逻辑（简化冗余代码） ==========
  document.addEventListener('mousemove', function(e) {
    const mouseY = e.clientY;
    const windowHeight = window.innerHeight;
    const isInUpper = mouseY < windowHeight / 2;

    // 锁定状态直接返回
    if (isClicked) return;

    if (isInUpper) {
      if (!upperTimer) {
        upperTimer = setTimeout(() => {
          elements.bgImg.classList.remove("none");
          elements.bgImg.classList.add("show");
          toggleModButtons(false);
          hideAllTextModules();
          upperTimer = null;
        }, 1000);
      }
    } else {
      clearTimeout(upperTimer);
      upperTimer = null;
      elements.bgImg.classList.remove("show");
      elements.bgImg.classList.add("none");
      toggleModButtons(true);
      showAllTextModules();
    }
  });

  // ========== 5. 页面点击逻辑（修复漏处理的按钮） ==========
  document.addEventListener('click', function(e) {
    if (e.target.id === "back") return;

    const mouseY = e.clientY;
    const windowHeight = window.innerHeight;
    const isInUpper = mouseY < windowHeight / 2;

    if (!isClicked && isInUpper) {
      clearTimeout(upperTimer);
      upperTimer = null;
      lockUpperArea(true); // 统一调用锁定函数
    }
  });

  // ========== 6. 返回按钮逻辑（简化） ==========
  elements.back.onclick = function() {
    lockUpperArea(false); // 统一调用解锁函数
    upperTimer = null;
  };

  // ========== 7. 下载游戏按钮 ==========
  elements.downloadGame.onclick = function() {
    window.open("https://store.steampowered.com/app/3865150/_/", "myTap");
  };

  // ========== 8. 下载MOD按钮（修复重复绑定问题） ==========
  elements.downloadMod.onclick = function() {
    window.location.href = "./syq_mod 1.0.0.exe";
  };
  elements.downloadModCode.onclick = function() {
    window.location.href = "./syq_mod_code.exe";
  };

  // ========== 9. 更新日志按钮 ==========
  elements.updateLogBtn.onclick = function() {
    window.open("更新日志.txt", "logtab");
  };

  // ========== 10. 反馈邮箱：复制+跳转（优化容错） ==========
  if (elements.feedbackEmail) {
    elements.feedbackEmail.style.cursor = "pointer";
    elements.feedbackEmail.addEventListener('click', function() {
      const email = "334847001@qq.com";
      navigator.clipboard.writeText(email)
        .catch(err => console.error("复制失败:", err))
        .finally(() => window.open("https://mail.qq.com/", "emailtab"));
    });
  }
};