pipeline {
  agent any

  environment {
    IMAGE_NAME_BACKEND = "homedine-backend"
    IMAGE_NAME_FRONTEND = "homedine-frontend"
    DOCKER_CREDENTIALS_ID = "docker-hub-creds"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend Image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME_BACKEND}:latest ./backend'
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME_FRONTEND}:latest ./frontend'
      }
    }

    stage('Login and Push') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: env.DOCKER_CREDENTIALS_ID,
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            set -e
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker tag ${IMAGE_NAME_BACKEND}:latest $DOCKER_USER/${IMAGE_NAME_BACKEND}:latest
            docker tag ${IMAGE_NAME_FRONTEND}:latest $DOCKER_USER/${IMAGE_NAME_FRONTEND}:latest
            docker push $DOCKER_USER/${IMAGE_NAME_BACKEND}:latest
            docker push $DOCKER_USER/${IMAGE_NAME_FRONTEND}:latest
          '''
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}