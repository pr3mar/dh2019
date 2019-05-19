FROM python:3
ADD requirements.txt .
RUN pip install -r requirements.txt
ENV PYTHONUNBUFFERED=1
ADD manager.py scheduler.py utils.py ./
ENTRYPOINT python3 manager.py