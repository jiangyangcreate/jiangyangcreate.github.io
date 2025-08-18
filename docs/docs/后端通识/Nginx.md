---
sidebar_position: 6
title: Nginx
---

Nginx 是异步框架的网页服务器，也可以用作反向代理、负载平衡器和HTTP缓存。

## Nginx配置文件结构

打开conf文件夹的nginx.conf文件，Nginx服务器的基础配置，默认的配置也存放在此。

在 nginx.conf 的注释符号为： #
默认的 nginx 配置文件 nginx.conf 内容如下：

```bash
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```


缓存是一种将经常使用的数据或信息存储在本地内存中一段时间​​的技术。因此，下次客户端请求相同的信息时，不再从数据库中检索信息，而是从本地内存中获取信息。缓存的主要优点是它通过减少处理负担来提高性能。

## CDN

CDN(Content Delivery Network)是指内容分发网络，也称为内容传送网络，这个概念始于1996年，由于CDN是为加快网络访问速度而被优化的网络覆盖层，因此被形象地称为“网络加速器”。尽管使用 CDN 的好处因 Internet 资产的规模和需求而异，但对大多数用户而言，主要好处可以分为 4 个不同的组成部分：

- 改善网站加载时间- 通过使用附近的 CDN 服务器（以及其他优化）将内容分发到更靠近网站访问者的位置，访问者可以体验更快的页面加载时间。由于访问者更倾向于点击离开加载缓慢的网站，CDN 可以降低跳出率并增加人们在网站上花费的时间。换句话说，网站速度越快，访问者停留时间越长。
- 降低带宽成本——网站托管的带宽消耗成本是网站的主要支出。通过缓存和其他优化，CDN 能够减少源服务器必须提供的数据量，从而降低网站所有者的托管成本。
- 增加内容的可用性和冗余——大量的流量或硬件故障会中断正常的网站功能。由于其分布式特性，与许多源服务器相比，CDN 可以处理更多流量并更好地承受硬件故障。
- 提高网站安全性- CDN 可以通过提供DDoS 缓解、安全证书改进和其他优化来提高安全性。

## Server Side

服务器端缓存将 Web 文件和数据临时存储在源服务器上，以备后用。

当用户第一次请求网页时，网站进入正常的从服务器获取数据的过程，生成或构建网站的网页。在请求发生并且响应被发回后，服务器复制网页并将其存储为缓存。下次用户重新访问该网站时，它会加载已保存或缓存的网页副本，从而加快访问速度。

服务器端缓存的主要问题是延迟。延迟可以定义为数据包从源行进到目的地的总时间。高延迟意味着用户请求和服务器响应的显着延迟。服务器端缓存的另一个问题是，如果网页上的数据发生变化，服务器必须从头开始重建。

## Client Side

客户端缓存通常称为浏览器缓存，浏览器缓存也包含很多内容： HTTP 缓存、indexDB、cookie、localstorage 等等。

尽管客户端缓存是一个稍微宽泛的术语。其运行原理如：一旦浏览器从服务器请求数据，它就会将其存储到浏览器创建的文件夹中。 下次打开网页时，它不会调用服务器获取数据，而是从浏览器缓存文件夹中提取数据。

客户端缓存的缺点之一是它是特定于浏览器的，如果你使用多个浏览器，那么同一个网页就会有不同的缓存文件。客户端缓存的另一个缺点是它比服务器端缓存更复杂。

## 面试常问

### 浏览器具体的缓存策略有哪些？

具体的缓存策略，分为强缓存和协商缓存两种。

#### 优先进行强缓存

1. 浏览器针对资源 A 初次发起请求，依次查看 ServiceWorker Cache、Memory Cache 和 Disk Cache 是否有缓存。因为没有，所以请求到达服务器，服务器返回资源和携带在头部字段中的缓存策略
2. 浏览器这边自动缓存资源的引用到 Memory Cache 中，同时根据头部字段将资源缓存到 Disk Cache 中，如果开发者使用了 Service Worker Cache，也会对应做一个缓存
3. 片刻后，用户再次针对资源 A 发起请求，浏览器会依次查看 Memory Cache 和 Disk Cache 是否有缓存，接着查看缓存是否新鲜（是否没有过期）
4. 如果缓存没有过期，那么恭喜，这时候可以直接从 Disk Cache 中获取资源 A 并返回，我们称这种情况为命中强缓存、走强缓存路线。

- 在 http/1.0 中，服务端会返回一个 Expires 头部字段，它是一个绝对的到期时间，只要浏览器再次发送请求的时候没有过这个时间，就认为缓存没有过期。
- 在 http/1.1 中，Expires 被 Cache-Control 取代。而 Cache-Control 可以设置一个 max-age = `<seconds>`，指的是从请求发起过了多少秒之后，缓存才会过期

#### 其次进行协商缓存

如果缓存已经过期，那么浏览器就需要和服务器进行协商，协商的内容就是：我应该继续使用这个已经过期的缓存资源，还是使用可能已经发生更新的新资源？这时候称为没有命中强缓存、走协商缓存路线。

1. 【对比哈希值】如果第一次的响应携带了 ETag 字段：浏览器将 ETag 的字段值作为 If-None-Match 的字段值，向服务器发送条件请求，相当于是在问服务器：==当时发送资源给我的时候，这个资源的唯一标识是 ETag，是否这个哈希值仍然和资源的目前最新的哈希值一致呢？==服务器就会拿收到的这个字段值与目前最新的资源哈希值进行比较，如果一致说明资源没有发生修改，此时返回 304 状态码，让浏览器使用之前的旧缓存；如果不一致说明资源发生了修改，此时重新响应 200 和新资源给浏览器
2. 【对比修改时间】如果第一次的响应没有携带 ETag 字段，但是携带了 Last-Modified 字段：浏览器将 Last-Modified 的字段值作为 If-Modified-Since 的字段值，向服务器发送条件请求，相当于是在问服务器：==当时发送资源给我的时候，最后一次修改资源的时间是 Last-Modified，是否自从这个时间之后，资源没有再次被修改呢？==服务器就会拿收到的这个字段值与目前最新的资源修改时间进行比较，如果时间吻合说明资源没有发生修改，此时返回 304 状态码，让浏览器使用之前的旧缓存；如果时间不吻合说明资源发生了修改，此时重新响应 200 和新资源给浏览器
3. 如果两个字段都没有携带：此时就进行正常的请求响应

> ETag 进行校验:

- 优点：因为它本质上是基于文件内容进行编码所产生的哈希值，可以精确地感知文件内容的变化，所以用来判断资源是否发生修改，准确性会很高。
- 缺点：每次 ETag 的生成都需要进行一次哈希计算，对服务器的性能有一定的影响。

> Last-Modified 校验:

- 优点：只需要记录一个时间，性能要好很多。
- 缺点：最小只能精确到秒这个量级，这就是说，如果资源在一秒内发生了多次修改，其实服务器是看不出来的，给出的结果依然是资源没有发生修改。

### Redis 与 Memcached作为缓存的优缺点

1. 都是内存数据库。Redis和Memcache都是将数据存放在内存中；
2. 数据类型不同。redis有五种(list set string hash zset),memcached只有一种string；
3. Redis支持数据的持久化。可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用；
4. Redis支持数据的备份，即master-slave模式的数据备份；
5. memcache挂掉后，数据不可恢复; redis数据丢失后可以通过aof恢复；
6. 由于 redis 只使用单核，而 memcached 可以使用多核，所以平均每一个核上 redis 在存储小数据时比 memcached 性能更高。而在 100k 以上的数据中，memcached 性能要高于 redis，虽然 redis 最近也在存储大数据的性能上进行优化，但是比起 memcached，还是稍有逊色。

Redis做缓存的优点：速度快，完全基于内存，使用C语言实现，网络层使用epoll解决高并发问题。

### Redis 四种缓存机制

redis四种缓存机制：分为缓存穿透，缓存雪崩，缓存击穿，缓存预热。

#### 一. 缓存雪崩

缓存雪崩是指在短时间内，有大量缓存同时过期，导致大量的请求直接查询数据库，从而对数据库造成了巨大的压力，严重情况下可能会导致数据库宕机的情况叫做缓存雪崩。

当缓存失效时，大量请求直接绕过 Redis 去请求数据库，导致会对数据库造成很大压力。

解决方法：

1. 加锁排队
2. 随机化过期时间

#### 二.缓存穿透

缓存穿透说白了就是查询一个一定不存在的数据，由于缓存是未命中从数据库去查询，查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到数据库去查询，造成缓存穿透。

解决方法：

1. 布隆过滤器：
   我们可以使用布隆过滤器来解决,可以将布隆过滤器想象成一个map,请求一个不存在的数据,我们就把它放到这个map中，每次请求前先通过map过滤一遍，如果map中存在这个值就直接将请求拦截掉。
2. 缓存空结果:
   我们可以把每次从数据库查询的数据都保存到缓存中，我们可以将空结果的缓存时间设置得短一些，例如 1-3 分钟。

#### 三、缓存击穿

缓存击穿指的是某个热点缓存，在某一时刻恰好失效了，然后客户端访问数据的时候，redis中没有数据，mysql中有数据，相当于直接跳过了redis。

解决方法：

1. 加锁排队
   在查数据库时进行加锁，缓冲大量请求, 以减少数据库压力
2. 设置永不过期
   对于某些热点缓存，我们可以设置永不过期，这样就能保证缓存的稳定性，但需要注意在数据更改之后，要及时更新此热点缓存，不然就会造成查询结果的误差。

#### 四、缓存预热

缓存预热并不是一个问题，而是使用缓存时的一个优化方案，它可以提高前台用户的使用体验。

缓存预热指的是在系统启动的时候，先把查询结果预存到缓存中，以便用户后面查询时可以直接从缓存中读取，以节约用户的等待时间。

