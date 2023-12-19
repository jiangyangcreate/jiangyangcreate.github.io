## FastAPI

```python
from fastapi import FastAPI
import uvicorn
import random
from fastapi.responses import HTMLResponse

app = FastAPI()

# 返回一个1-100的随机数
@app.get("/random")
def get_random_num():
    num = random.randint(1, 100)
    return {"random": num}

# 返回一个html页面
@app.get("/all", response_class=HTMLResponse)
def get_all():
    html = """<html></html>"""
    return html
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=6022)
```