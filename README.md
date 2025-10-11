Conventional Commits（规范提交）笔记

## 规范提交模板

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

## 翻译

<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]

## 其中 type（类型）中包含如下信息：

    1.fix（代表修复了一个bug）
    2.feat（代表新增一个功能）

## 正文/脚注中使用

    1.BREAKING CHANGE（不兼容变更）
        -其他开发者更新你的代码库后，他们的代码会突然无法工作
        -需要发布大版本号（如从 v1.0.0 → v2.0.0）
        -所有使用者都需要修改自己的代码来适配

    例如
        1.在脚注中标注

            feat: 重构用户认证系统

            BREAKING CHANGE: 登录函数的参数从两个减少为一个，所有调用者需要移除第二个参数

        2.在标题中用 ! 标注

            feat(api)!: 移除已废弃的 getUserInfo 方法

## 其他提交类型

    build（构建）: 用于修改项目构建系统，例如修改依赖库、外部接口或者升级 Node 版本等。
        比如升级 Node.js 版本,安装/升级/移除webpack、vite依赖库,修改构建配置等。

    chore（杂项）：除改代码、修bug以外的杂活。
        比如清理注释、调整代码顺序等。

    ci（自动化）：调整与自动化相关的规则。
        比如修改 GitHub Actions、Jenkins 等CI工具的配置文件，调整了自动打包到上传仓库流程。

    docs（文档说明）：修改文档文件。
        比如修改README.md文件、修改API文档说明等。

    style（样式）：修改代码的样式。（不是css页面样式，别搞混！）
        比如调整了缩进、加了空格、去掉空行。

    refactor（重构）：重构代码，但不影响代码原本功能。
        比如修改代码结构、变量名、函数名等。（不影响原本逻辑）

    perf（性能）：优化代码运行效率，减少内容调用。
        比如减少for的使用，用if替代else if等。

    test（测试）：测试用例相关。
        增删查改测试用例。

## 其他细节补充

    ### 1.每个提交都必须使用类型字段前缀，它由一个名词构成，诸如 feat 或 fix ， 其后接可选的范围字段，可选的 !，以及必要的冒号（英文半角）和空格。

        正确例子
            feat: 添加购物车功能
            fix(auth): 修复登录验证问题
            refactor!: 重构用户服务类

        错误例子
            添加购物车功能          # 缺少类型前缀
            feat : 添加功能         # 冒号前有空格
            feat:添加功能           # 冒号后缺少空格

    ### 2.当一个提交为应用或类库实现了新功能时，必须使用 feat 类型。

        正确例子
            feat: 新增商品搜索功能
            feat(payment): 集成支付宝支付

        错误例子
            add: 新增商品搜索功能    # 应该用feat，不是add
            update: 添加支付功能    # 应该用feat

    ### 3.当一个提交为应用修复了 bug 时，必须使用 fix 类型。

        正确例子
            fix: 修复订单金额计算错误
            fix(database): 修复连接池泄露问题

        错误例子
            bugfix: 修复计算错误     # 应该用fix
            correct: 修正金额问题   # 应该用fix

    ### 4.范围字段可以跟随在类型字段后面。范围必须是一个描述某部分代码的名词，并用圆括号包围，例如： fix(parser):

        正确例子
            feat(user): 添加用户头像上传
            fix(api): 修复接口超时问题

        错误例子
        feat[user]: 添加功能     # 应该用圆括号
        fix(修复bug): 处理问题   # 范围应该是名词，不是动词短语

    ### 5.描述字段必须直接跟在 <类型>(范围) 前缀的冒号和空格之后。 描述指的是对代码变更的简短总结，例如： fix: array parsing issue when multiple spaces were contained in string 。

        正确例子
            fix: 修复数组解析时包含多个空格的问题
            feat(parser): 支持JSON5格式解析

        错误例子
            fix:修复数组解析问题      # 冒号后缺少空格
            feat(parser) : 支持JSON5 # 括号和冒号间有空格

    ### 6.在简短描述之后，可以编写较长的提交正文，为代码变更提供额外的上下文信息。正文必须起始于描述字段结束的一个空行后。

        正确例子
            feat: 实现图片压缩功能

            使用Sharp库对上传的图片进行自动压缩，支持JPEG和PNG格式。

        错误例子
            feat: 实现图片压缩功能
            使用Sharp库对上传的图片进行自动压缩。 # 缺少空行分隔

    ### 7.提交的正文内容自由编写，并可以使用空行分隔不同段落。

        正确例子
            refactor: 优化数据库查询性能

            重构用户信息查询逻辑，减少不必要的联表查询。

            具体改进：
            - 使用JOIN替代多次查询
            - 添加必要的数据库索引
            - 缓存常用查询结果

            性能提升：
            用户列表查询时间从2秒降低到200毫秒。

    ### 8.在正文结束的一个空行之后，可以编写一行或多行脚注。每行脚注都必须包含 一个令牌（token），后面紧跟 :<space> 或 <space># 作为分隔符，后面再紧跟令牌的值（受 git trailer convention 启发）。

        正确例子
            1.
            feat: 新增导出功能

            Fixes: #123
            Reviewed-by: 张三

            2.
            fix: 修复数据同步问题

            Closes #456
            See also #789

        错误例子
            feat: 新增功能
            Fixes:#123          # 缺少空格
            Closes#456          # 缺少空格

    ### 9.脚注的令牌必须使用 - 作为连字符，比如 Acked-by (这样有助于 区分脚注和多行正文)。有一种例外情况就是 BREAKING CHANGE，它可以被认为是一个令牌。

        正确例子
            docs: 更新API文档

            Reviewed-by: 李四
            Acked-by: 王五
            Tested-by: 测试组

        错误例子
            docs: 更新文档
            Reviewed_by: 李四    # 应该用连字符
            AckedBy: 王五        # 应该用连字符

    ### 10.脚注的值可以包含空格和换行，值的解析过程必须直到下一个脚注的令牌/分隔符出现为止。

        正确例子
            feat: 新增复杂配置系统

            BREAKING CHANGE: 配置文件格式完全改变，
            现在支持嵌套配置和环境变量替换。
            请参考迁移指南：docs/configuration-migration.md
            Reviewed-by: 架构组
            Fixes: #333

    ### 11.破坏性变更必须在提交信息中标记出来，要么在 <类型>(范围) 前缀中标记，要么作为脚注的一项。

        正确例子
            1.
            feat(api)!: 重构数据返回格式

            2.
            feat: 重构数据返回格式

            BREAKING CHANGE: 返回格式从数组改为对象
    ### 12.包含在脚注中时，破坏性变更必须包含大写的文本 BREAKING CHANGE，后面紧跟着冒号、空格，然后是描述，例如： BREAKING CHANGE: environment variables now take precedence over config files 。

        正确例子
            refactor: 统一错误处理机制

            BREAKING CHANGE: 所有API错误响应格式已标准化，
            错误代码体系重新设计，请更新客户端错误处理逻辑。

        错误例子
            refactor: 统一错误处理

            breaking change: 错误格式变化  # 必须大写
            BREAKING CHANGE:格式变化      # 冒号后缺少空格

    ### 13.包含在 <类型>(范围) 前缀时，破坏性变更必须通过把 ! 直接放在 : 前面标记出来。 如果使用了 !，那么脚注中可以不写 BREAKING CHANGE:， 同时提交信息的描述中应该用来描述破坏性变更。

        正确例子
            feat!: 移除已废弃的API接口
            refactor(database)!: 更改数据表结构

        错误例子
            feat! : 移除接口    # !和:之间不能有空格
            feat!:移除接口      # !:后缺少空格

    ### 14.在提交说明中，可以使用 feat 和 fix 之外的类型，比如：docs: updated ref docs. 。

        正确例子
            docs: 更新项目README文件
            style: 统一代码缩进格式
            test: 添加用户登录测试用例
            chore: 更新项目依赖版本
            perf: 优化图片加载性能
            build: 升级Webpack配置
            ci: 配置GitHub Actions
            refactor: 重构工具函数

    ### 15.工具的实现必须不区分大小写地解析构成约定式提交的信息单元，只有 BREAKING CHANGE 必须是大写的。

            Feat:、FEAT:、feat: 都视为 feat:
            Fix(parser):、FIX(PARSER): 都视为 fix(parser):
            但 breaking change: 不会被识别，必须用 BREAKING CHANGE:

    ### 16.BREAKING-CHANGE 作为脚注的令牌时必须是 BREAKING CHANGE 的同义词。

        正确例子
            feat: 更改认证方式

            BREAKING-CHANGE: 从Session认证改为JWT Token认证
            //等同于 BREAKING CHANGE:
