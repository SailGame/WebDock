FROM golang:1.14

ENV version v1.4.0

RUN wget https://github.com/SailGame/Core/releases/download/${version}/sailgame.core.${version}.linux.amd64.tar.gz

RUN tar -zxvf sailgame.core.${version}.linux.amd64.tar.gz

RUN mv core /usr/local/bin && chmod +x /usr/local/bin/core

ENTRYPOINT [ "/usr/local/bin/core" ]

EXPOSE 8080