---
sidebar_position: 1
title: 网络服务概述
---

# 网络服务

Web Server中文名称叫网页服务器或web服务器。WEB服务器也称为WWW(WORLD WIDE WEB)服务器，主要功能是提供网上信息浏览服务

- Nginx（发音同 engine x）是一款轻量级的Web服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，并在一个BSD-like 协议下发行。
- Apache是世界使用排名第一的Web服务器软件。它可以运行在几乎所有广泛使用的计算机平台上，由于其跨平台和安全性被广泛使用，是最流行的Web服务器端软件之一。同时Apache音译为阿帕奇
- Caddy是一个Go写的服务器软件，官方的宣传语The HTTP/2 web server with automatic HTTPS以及Serve The Web Like It is 2016简明表达了这个软件的优点和趋势，它拥有基本的apache或者nginx有的web server模块，同时还有一些很有特色的功能
- MS IIS 是Windows Server 的 Internet 信息服务 (IIS) 是一种灵活、安全且可管理的 Web 服务器，用于托管 Web 上的任何内容。从媒体流到 Web 应用程序，IIS 的可扩展和开放架构已准备好处理最苛刻的任务。

## Nginx

平台的用户越来越多了，并发量慢慢增大了，这时候一台服务器满足不了我们的需求了。
![image-1657526210295](/img/2023/image-1657526210295.png)

于是我们横向扩展，又增加了服务器。这个时候几个项目启动在不同的服务器上，用户要访问，就需要增加一个代理服务器了，通过代理服务器来帮我们转发和处理请求。我们希望这个代理服务器可以帮助我们接收用户的请求，然后将用户的请求按照规则帮我们转发到不同的服务器节点之上。这个过程用户是无感知的，用户并不知道是哪个服务器返回的结果，我们还希望他可以按照服务器的性能提供不同的权重选择。保证最佳体验！

![image-1657526243089](/img/2023/image-1657526243089.png)

- 反向代理：当我们的网站访问量越来越大，一台tomcat 服务器已经无法满足服务需求，需要加服务器，但是服务器直接无法实现session共享，需要加一层(nginx)，来转发控制，反向代理到三台服务器中某台，实现数据共享。
- 负载均衡：给服务器性能好的访问权重分配大，给服务性能差的分配流量少。
- 正向代理：访问原来无法访问的资源，如google、可以做缓存，加速访问资源、对客户端访问授权，上网进行认证、代理记录用户访问记录（上网行为管理），也可以对外网隐藏用户信息。
- iphash：对客户端请求的ip进行hash操作，然后根据hash结果将同一个客户端ip的请求分发给同一台服务器进行处理，可以解决session不共享的问题。
