## Git分布式版本控制工具

------

### 1. 作用

- 备份
- 代码还原
- 协同开发
- 追溯代码

### 2. 概述

#### 2.1 版本控制器方式

- 集中式：SVN和CVS
  - 版本库集中存放在中央服务器，团队中每个人从中央服务器下载代码，需要联网。个人修改后提交到中央版本库。

- 分布式：Git

  - 没有中央服务器，而是共享版本库，每个人电脑上都是一个完整的版本库，无需联网，多人协作时只需要把各自的修改推给对方。

  - 支持非线性开发模式，可高效管理类似Linux内核一样的大规模项目。

    <img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416112553468.png" alt="image-20220416112553468" style="zoom: 67%;" />

#### 2.2 Git工作流程及命令

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416112651074.png" alt="image-20220416112651074" style="zoom:67%;" />

- 命令：

  ```
  1. clone 克隆：从 远程仓库 中 克隆代码 到 本地仓库 
  2. checkout 检出：从 本地仓库 中 检出一个分支然后进行修订
  3. add 添加：在提交前 先将代码提交到 暂存区
  4. commit 提交：提交到 本地仓库。本地仓库中保存 修改的各个历史版本
  5. fetch 抓取：从 远程仓库 抓取到 本地仓库，不进行任何的合并动作（一般操作比较少）
  6. pull 拉取：从 远程仓库 拉到 本地仓库，自动进行合并，然后放到工作区（相当于fetch+merge）
  7. push 推送：修改完成后，将代码推送到远程仓库
  ```

### 3. Git安装与常用命令

#### 3.1 Git环境配置

```
Git Bash中演示，基本linux命令：
1. lS/ll  查看当前目录
2. cat    查看文件内容和
3. touch  创建文件
4. vi     vi编辑器
```

##### 3.1.1 下载与安装

1. 下载地址： http://git-scm.com/download （挂VPN）

   - Git GUI     Git提供的 **图形界面工具**

   - Git Bash   Git提供的 **命令行工具**

2. 安装后需要 **设置用户名称和Email地址**

##### 3.1.2 基本配置

1. 打开Git Bash
2. **设置 **用户信息
   - git config --global user.name fpb
   - git config --global user.email 1445643707@qq.com
3. **查看 **配置信息
   - git config --global user.name
   - git config --global user.email

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416122319487.png" alt="image-20220416122319487" style="zoom: 80%;" />

##### 3.1.3 解决GitBash乱码问题

1. 打开Git Bash执行以下命令

   ```
   git config --global core.quotepath false
   ```

2. ＄{git_home}/etc/bash.bashrc 文件最后加入以下两行

   ```
   export LANG="zh_CN.UTF-8"
   export LC_ALL="zh_CN.UTF-8"
   ```

#### 3.2 获取本地仓库

1. 在电脑的任意位置创建一个 **空目录** 作为本地Git仓库
2. 进入目录，右键打开Git Bash窗口
3. 执行命令 **git init**
4. 创建成功即可在文件夹下看到 **隐藏的.git目录**

![image-20220416122502395](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416122502395.png)

#### 3.3 基础操作指令

- Git工作目录**（除.git以外的文件）**下对文件的修改**（增删、更新）**会存在几个状态，这些**修改的状态**会随着**执行Git命令**而变化

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416120843329.png" alt="image-20220416120843329" style="zoom:67%;" />

- 使用命令 **控制这些状态的转换**：
  - git add           工作区 ----> 暂存区
  - git commit    暂存区 ----> 本地仓库

- 即只要文件进行了修改，**都需要经过add和commit**才可以进入到仓库中

##### 3.3.1 查看修改的状态

- 命令 **git status** 可查看当前文件 **修改** 的状态**（工作区or暂存区）**

- 如先创建file01.txt文件

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416123602648.png" alt="image-20220416123602648" style="zoom: 67%;" />

- 此时显示此文件是 **untracked** 状态，即 **未跟踪**

- 命令 **git add** 将此文件 **放进暂存区**，注意add后的 **"." 或 "*"** 为通配符，代表 **操作所有文件**，也可以是 **文件名**

  如 **git add file01.txt**，不过一般都是操作所有文件，分开写比较麻烦

  **changes to be commited** 即将被提交

  <img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416124141589.png" alt="image-20220416124141589" style="zoom:67%;" />

- 命令 **git commit** 将文件放进 **仓库**，格式为 **git commit -m "标记"**，标记为提交成功提示语，方便检查是否更新文件

##### 3.3.2 查看提交日志

- 命令 **git log** 可查看 **提交日志（提交次数、信息等）**

<img src="C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416124929883.png" alt="image-20220416124929883" style="zoom:67%;" />

- 利用 **git config --global core.editor "code --wait"** 也可向编辑器中添加提交成功提示语（会用vscode打开）

##### 3.3.3 版本回退

- **git reset --hard commitID**
  - commitID 可使用 **git log** 查看

- 查看已经删除的记录
  - git reflog
  - 可查看已经删除的提交记录

##### 3.3.4 重命名文件与移除文件

- **git mv 原文件名 新文件名**

  - 注意文件名包含 **格式**

  ![image-20220416152817538](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20220416152817538.png)

- **git rm 文件名**

  - 移除文件

##### 3.3.5 Git操作简要流程

1. 仓库初始化
   1. 创建目录，并在目录下打开GitBash
   2. **git init** 初始化仓库
2. 创建文件并提交
   1. 目录下创建文件
   2. **git add .** 将修改加入暂缓区
   3. **git commit -m""** 将修改提交到本地仓库
3. 将最后一次修改还原
   1. 找到倒数第二次提交的commitID
   2. **git reset commit --hard** 版本回退

#### 4. Github

##### 4.1 创建远程仓库

- Github右上角   **+New Repository**

##### 4.2 远程仓库操作

```
git remove -v                  查看当前所有远程地址别名
git remove add 别名 远程地址     给远程仓库地址起别名（别名最好和远程仓库名一致）
git push 别名（或远程地址）分支    推送本地分支上的内容到远程仓库（受网络影响）
git clone 远程地址              将远程仓库的内容克隆到本地
git pull 别名 远程分支名         将远程仓库对应分支最新内容拉下来与当前本地分支合并
```