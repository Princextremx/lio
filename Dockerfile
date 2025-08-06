# Utilise Node.js version LTS (basé sur Debian Buster)
FROM node:lts-buster

# Mise à jour des paquets et installation de dépendances système utiles
RUN apt-get update && \
    apt-get install -y \
    git \
    curl \
    ffmpeg \
    imagemagick \
    webp \
    libvdpau-va-gl1 \
    mesa-va-drivers \
    mesa-vdpau-drivers \
    && rm -rf /var/lib/apt/lists/*

# Clone du projet depuis GitHub
RUN git clone https://github.com/PrinceXtremeX/MINI-BOT/root/ikJawad

# Positionne le dossier de travail dans le répertoire du projet
WORKDIR /root/ikJawad

# Installe les dépendances Node.js (npm ou yarn fallback)
RUN npm install || yarn install --network-concurrency 1

# Installe pm2 globalement
RUN npm install -g pm2

# Si tu veux copier des fichiers locaux et les écraser sur le projet cloné :
# COPY . .

# Expose le port utilisé par ton bot (change si ce n’est pas 9090)
EXPOSE 9090

# Commande de démarrage
CMD ["pm2-runtime", "index.js"]
