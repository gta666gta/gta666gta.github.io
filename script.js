window.onload = function() {
  // ========== 1. 获取所有元素 ==========
  const img = document.getElementById("bgImg");
  const back = document.getElementById("back");
  const download = document.getElementById("download");
  const download_mod = document.getElementById("download_mod");
  const update_log_btn = document.getElementById("update_log_btn");
  const title = document.getElementById("title");
  const versioninfo = document.getElementById("versioninfo");
  const disclaimer = document.getElementById("disclaimer");
  const usage_guide = document.getElementById("usage_guide");
  const qq_groups = document.getElementById("qq_groups");
  const feedback_email = document.getElementById("feedback_email");
  const original_credit = document.getElementById("original_credit");

  // ========== 2. 初始化变量 ==========
  let upperTimer = null;
  let isClicked = false;

  // ========== 封装函数：隐藏所有文字模块 ==========
  function hideAllText() {
    title.style.display = "none";
    versioninfo.style.display = "none";
    disclaimer.style.display = "none";
    usage_guide.style.display = "none";
    qq_groups.style.display = "none";
    feedback_email.style.display = "none";
    original_credit.style.display = "none";
    update_log_btn.style.display = "none";
  }

  // ========== 封装函数：显示所有文字模块 ==========
  function showAllText() {
    title.style.display = "block";
    versioninfo.style.display = "block";
    disclaimer.style.display = "block";
    usage_guide.style.display = "block";
    qq_groups.style.display = "block";
    feedback_email.style.display = "block";
    original_credit.style.display = "block";
    update_log_btn.style.display = "block";
  }

  // ========== 3. 鼠标移动逻辑 ==========
  document.addEventListener('mousemove', function(e) {
    const mouseY = e.clientY;
    const windowHeight = window.innerHeight;
    const isInUpper = mouseY < windowHeight / 2;

    // 锁定状态：只显示背景+返回+下载游戏按钮
    if (isClicked) {
      img.classList.remove("none");
      img.classList.add("show");
      back.style.display = "block";
      download.style.display = "block";
      download_mod.style.display = "none";
      hideAllText();
      return;
    }

    // 鼠标在上半区：延迟1秒显示背景+隐藏文字
    if (isInUpper) {
      if (!upperTimer) {
        upperTimer = setTimeout(() => {
          img.classList.remove("none");
          img.classList.add("show");
          download_mod.style.display = "none";
          hideAllText(); // 隐藏所有文字
          upperTimer = null;
        }, 1000);
      }
    } else {
      // 鼠标在下半区：清除定时器+隐藏背景+显示文字
      if (upperTimer) {
        clearTimeout(upperTimer);
        upperTimer = null;
      }
      img.classList.remove("show");
      img.classList.add("none");
      download_mod.style.display = "block";
      showAllText(); // 显示所有文字
    }
  });

  // ========== 4. 页面点击逻辑 ==========
  document.addEventListener('click', function(e) {
    if (e.target.id === "back") return;

    const mouseY = e.clientY;
    const windowHeight = window.innerHeight;
    const isInUpper = mouseY < windowHeight / 2;

    // 点击上半区：锁定显示状态
    if (!isClicked && isInUpper) {
      isClicked = true;
      if (upperTimer) {
        clearTimeout(upperTimer);
        upperTimer = null;
      }
      img.classList.remove("none");
      img.classList.add("show");
      back.style.display = "block";
      download.style.display = "block";
      download_mod.style.display = "none";
      hideAllText(); // 隐藏所有文字
    }
  });

  // ========== 5. 返回按钮逻辑 ==========
  back.onclick = function() {
    isClicked = false;
    img.classList.remove("show");
    img.classList.add("none");
    back.style.display = "none";
    download.style.display = "none";
    download_mod.style.display = "block";
    showAllText(); // 恢复所有文字
    upperTimer = null;
  };

  // ========== 6. 下载游戏按钮 ==========
  download.onclick = function() {
    window.open("https://store.steampowered.com/app/3865150/_/", "myTap");
  };

  // ========== 7. 下载MOD按钮（点击后什么都不做） ==========
  download_mod.onclick = function() {
    // 预留位置，暂时不执行任何操作
  };

  // ========== 8. 更新日志按钮 ==========
  update_log_btn.onclick = function() {
    window.open("更新日志.txt", "logtab");
  };

  // ========== 9. 反馈邮箱：复制+跳转 ==========
  if (feedback_email) {
    feedback_email.style.cursor = "pointer";
    feedback_email.addEventListener('click', function() {
      const email = "334847001@qq.com";
      navigator.clipboard.writeText(email).then(() => {
        window.open("https://mail.qq.com/", "emailtab");
      }).catch(err => {
        console.error("复制失败:", err);
        window.open("https://mail.qq.com/", "emailtab");
      });
    });
  }
};