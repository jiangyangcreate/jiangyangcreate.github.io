---
sidebar_position: 1
title: 接口认证概述
---

# 接口认证

API（应用程序编程接口）是一组规则，用于定义应用程序或设备如何相互连接和通信。

## REST

REST API 是符合 REST（表述性状态转移）架构样式设计原则的 API。 因此，REST API 有时被称为 RESTful API。

EST API 几乎可以使用任何编程语言进行开发，并支持多种数据格式。 唯一的要求是它们要符合以下六个 REST 设计原则 - 也称为架构约束：

- 统一接口。 无论请求来自何处，对同一资源发出的所有 API 请求都应该看起来相同。 REST API 应确保同一条数据（例如用户的姓名或电子邮件地址）仅属于一个统一资源标识符 (URI)。 资源不应过大，但应包含客户可能需要的每一条信息。
- 客户端/服务器解耦。 在 REST API 设计中，客户端和服务器应用程序必须彼此完全独立。 客户端应用程序只需知道所请求资源的 URI 即可； 它不能以任何其他方式与服务器应用程序交互。 同样，除了通过 HTTP 将客户端应用程序传递到所请求的数据外，服务器应用程序不应修改客户端应用程序。
- 无状态。 REST API 是无状态的，这意味着每个请求都需要包含处理它所需的全部信息。 换句话说，REST API 不需要任何服务器端会话。 不允许服务器应用程序存储与客户端请求相关的任何数据。
- 可缓存性。 如果可能，资源应该可以在客户端或服务器端缓存。 服务器响应还需要包含有关是否允许对交付的资源进行缓存的信息。 目标是提高客户端的性能，同时增强服务器端的可扩展性。
- 分层系统架构。 在 REST API 中，调用和响应都会经过多个不同的层。 根据经验，请不要将客户端和服务器应用程序直接相互连接。 通信环路中可能包含多个不同的中介服务器。 需要设计 REST API，让客户端和服务器都无法判断它是与最终应用程序还是中介服务器进行通信。
- 按需编码（可选）。 REST API 通常发送静态资源，但在某些情况下，响应也可以包含可执行代码（例如 Java 小程序）。 在这些情况下，代码只应按需运行。

> REST API 通过 HTTP 请求进行通信，以便执行标准数据库功能，例如在资源中创建、读取、更新和删除记录（这些操作也称为 CRUD）。 例如，REST API 可使用 GET 请求检索记录、使用 POST 请求创建记录、使用 PUT 请求更新记录以及使用 DELETE 请求删除记录。 可以在 API 调用中使用所有 HTTP 方法。 精心设计的 REST API 类似于在具有内置 HTTP 功能的 Web 浏览器中运行的 Web 站点。
> 任何特定时刻或时间戳的资源状态称为资源表示。 几乎可以采用任何格式将该信息传递到客户端，包括 JavaScript 对象表示法 (JSON)、HTML、XLT、Python、PHP 或纯文本。 JSON 非常受欢迎，因为它可以被人类和机器读取，而且与编程语言无关。
> 在 REST API 调用中，请求头和参数也很重要，因为它们包含重要的标识信息，例如元数据、授权、统一资源标识符 (URI)、缓存、cookie 等。 在精心设计的 REST API 中会使用请求头、响应头和常规 HTTP 状态码。

### 认证

> 提到认证必然绕不开密码学

#### Web authentication 概念和用例

Web Authentication API（也称作 WebAuthn）使用asymmetric (public-key) cryptography （非对称加密）替代密码或 SMS 短信在网站上注册、登录、second-factor authentication（双因素验证）。 解决了 phishing（钓鱼）、data breaches（数据破坏）、SMS 文本攻击、其它双因素验证等重大安全问题，同时显著提高了易用性（因为用户不必管理许多越来越复杂的密码）。

许多网站已实现用户注册账号，登录已有账号的页面， WebAuthn 作为这些页面的替代和补充。类似其他形式的 Credential Management API（凭据管理 API）。Web Authentication API 有两个对应于注册和登录的基本方法：

- navigator.credentials.create() - 当使用 publicKey 选项时，创建一个新的凭据，无论是用于注册新账号还是将新的非对称密钥凭据与已有的账号关联。
- navigator.credentials.get() - 当使用 publicKey 选项时，使用一组现有的凭据进行身份验证服务，无论是用于用户登录还是双因素验证中的一步。

请注意： create() 和 get() 都需要在 Secure Context（安全上下文）中执行（例如 - 使用 https 连接，或是使用 localhost），当浏览器不是在安全环境下时它们将不可用。

在基础实现中，create() 和 get() 会从服务器接收一个大随机数，称为"challenge"。"challenge"将由私钥签名并返回给服务器。这可以服务器证明用户拥有身份验证所需要的私钥，与此同时没有任何密码在网络上被传输。

为了了解 create() 和 get() 方法在实际中的使用，我们需要理解它们位于浏览器之外的两个部分之间：

1. 服务器 - WebAuthn API 旨在在服务器（也称为服务或依赖方）上注册新的凭据，以供稍后在同一服务器上使用相同的凭据对用户进行身份验证。
2. 认证器 - 凭据将被创建并存储于被称为认证器的设备中。这是认证过程中的一个新概念：使用密码进行身份验证时，密码存储在用户的大脑中而不需要其他设备；使用 WebAuthn 进行身份验证时，密码则被存储在认证器中的密钥对替代。认证器可以被嵌入到操作系统中（例如 Windows Hello），也可以是 USB 或蓝牙安全密钥等物理令牌。

#### 注册（Registration）

一个典型的注册过程包括如图 1 所示的六个步骤，这些在稍后会进一步描述。这是一个注册过程的概览，所需数据已经被简化。

![image.png](/img/2023/image-17aa32febed04efcbe50a65b2fac4def.png)

0. 应用程序请求注册 - 应用程序发出注册请求。这个请求的协议和格式不在 WebAuthn 标准的范围内。
1. 服务器发送挑战、用户信息和依赖方信息 - 服务器将挑战、用户信息和依赖方信息发送回应用程序。在这里，协议和格式不在 WebAuthn 标准的范围内。通常，这可以是基于 HTTPS 连接的 REST（可能会使用 XMLHttpRequest 或 Fetch）API。不过只要在安全连接中，也可以使用 SOAP、RFC 2549 或几乎任何其他协议。从服务器接收到的参数将传递给 create() ，大部分情况下只需很少修改甚至不需要做任何修改。create() 会返回一个Promise，并返回包含 AuthenticatorAttestationResponse (en-US) 的 PublicKeyCredential (en-US)。需要注意的是挑战必须是随机的 buffer（至少 16 字节），并且必须在服务器上生成以确保安全。
2. 浏览器向认证器调用 authenticatorMakeCredential() - 在浏览器内部，浏览器将验证参数并用默认值补全缺少的参数，然后这些参数会变为 AuthenticatorResponse.clientDataJSON。其中最重要的参数之一是 origin，它是 clientData 的一部分，同时服务器将能在稍后验证它。调用 create() 的参数与 clientDataJSON 的 SHA-256 哈希一起传递到身份验证器（只有哈希被发送是因为与认证器的连接可能是低带宽的 NFC 或蓝牙连接，之后认证器只需对哈希签名以确保它不会被篡改）。
3. 认证器创建新的密钥对和证明 - 在进行下一步之前，认证器通常会以某种形式要求用户确认，如输入 PIN，使用指纹，进行虹膜扫描等，以证明用户在场并同意注册。之后，认证器将创建一个新的非对称密钥对，并安全地存储私钥以供将来验证使用。公钥则将成为证明的一部分，被在制作过程中烧录于认证器内的私钥进行签名。这个私钥会具有可以被验证的证书链。
4. 认证器将数据返回浏览器 - 新的公钥、全局唯一的凭证 ID 和其他的证明数据会被返回到浏览器，成为 attestationObject。
5. 浏览器生成最终的数据，应用程序将响应发送到服务器 - create() 的 Promise 会返回一个 PublicKeyCredential (en-US)，其中包含全局唯一的证书 ID PublicKeyCredential.rawId (en-US)  和包含 AuthenticatorResponse.clientDataJSON 的响应 AuthenticatorAttestationResponse (en-US)。你可以使用任何你喜欢的格式和协议将 PublicKeyCredential (en-US) 发送回服务器（注意 ArrayBuffer 类型的属性需要使用 base64 或类似编码方式进行编码）
6. 服务器验证数据并完成注册 - 最后，服务器需要执行一系列检查以确保注册完成且数据未被篡改。步骤包括：

- 验证接收到的挑战与发送的挑战相同
- 确保 origin 与预期的一致
- 使用对应认证器型号的证书链验证 clientDataHash 的签名和证明

验证步骤的完整列表可以在 WebAuthn 规范中找到。一旦验证成功，服务器将会把新的公钥与用户帐户相关联以供将来用户希望使用公钥进行身份验证时使用。

#### 验证（Authentication）

用户在 WebAuthn 中注册完成之后就可以使用 WebAuthn 进行身份验证（或者说登录）。验证流程与注册相似，图 2 所示的验证流程也与图 1 相似。不过，注册和验证之间的主要区别在于：

1) 验证不需要用户或信赖方信息；
2) 验证使用之前生成的密钥对创建一个断言，而不是使用在认证器在制造过程中烧录的密钥对创建证明。和上文一样，下面的验证流程图只是一个概况，并非详细描述。

![image.png](/img/2023/image-e01383eea3144b69ba6bcab4736a30f2.png)

0) 应用程序请求身份验证- 应用程序发出初始身份验证请求。此请求的协议和格式超出了 WebAuthn 的范围。
1) 服务器发送质询- 服务器发送质询 JavaScript 程序。与服务器通信的协议未指定，不在 WebAuthn 的范围内。通常，服务器通信将是基于https 的REST （可能使用XMLHttpRequest或Fetch），但它们也可以是SOAP、RFC 2549或几乎任何其他协议，前提是该协议是安全的。从服务器接收到的参数将被传递给get()调用，通常只需要很少或不需要修改。 请注意，挑战是随机信息的大缓冲区（例如 - 超过 100 个字节）是绝对关键的，并且必须在服务器上生成它以确保身份验证过程的安全性。
2) 浏览器在 Authenticator 上调用 authenticationatorGetCredential() - 在内部，浏览器将验证参数并填写任何默认值，这些默认值将变为AuthenticatorResponse.clientDataJSON. 最重要的参数之一是来源，它记录为 clientData 的一部分，以便服务器稍后可以验证来源。create() 调用的参数与 clientDataJSON 的 SHA-256 哈希一起传递给验证器（仅发送一个哈希，因为到验证器的链接可能是低带宽 NFC 或蓝牙链接，并且验证器是只是要签署哈希以确保它不会被篡改）。
3) Authenticator 创建断言- 身份验证器找到与依赖方 ID 匹配的此服务的凭据，并提示用户同意身份验证。假设这两个步骤都成功，身份验证器将通过在注册调用期间使用为此帐户生成的私钥签署 clientDataHash 和authenticatorData 来创建新断言。
4) Authenticator 将数据返回到浏览器 - 验证器将authenticatorData 和断言签名返回给浏览器。
5) 浏览器创建最终数据，应用程序向服务器发送响应- 浏览器将Promise 解析为 (  PublicKeyCredential en-US)，其中 PublicKeyCredential.response (en-US)包含 AuthenticatorAssertionResponse (en-US)。由 JavaScript 应用程序使用其选择的任何协议和格式将此数据传输回服务器。
6) 服务器验证并完成身份验证 - 在收到身份验证请求的结果后，服务器执行响应验证，例如：

- 使用在注册请求期间存储的公钥来验证身份验证者的签名。
- 确保验证者签名的质询与服务器生成的质询相匹配。
- 检查依赖方 ID 是否是此服务的预期 ID。

验证断言的完整步骤列表可以在 WebAuthn 规范中找到。假设验证成功，服务器将注意到用户现在已通过身份验证。这超出了 WebAuthn 规范的范围，但一种选择是为用户会话删除一个新的 cookie。

## Graphql

graphql 是一种用于 API 的查询语言，对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，减少数据的冗余。

![image-1657519260384](/img/2023/image-1657519260384.png)

在下图中，系统中的所有入口点（REST、GraphQL 和 RPC）都将使用相同的验证、授权和错误处理规则进行处理。

![image-1657519556322](/img/2023/image-1657519556322.png)

### 怎么使用 Graphql？

安装对应的模块

```language
pip install graphene
pip install strawberry-graphql
pip install ariadne
```

在py文件中可以运行这个简单的示例

```language
import graphene

class Query(graphene.ObjectType):
  hello = graphene.String(name=graphene.String(default_value="World"))

  def resolve_hello(self, info, name):
    return 'Hello ' + name

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello']) # "Hello World"
```

GraphQL 同样支持 Relay, Django, SQLAlchemy,  Google App Engine.

