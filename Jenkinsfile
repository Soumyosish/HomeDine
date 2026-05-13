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
        withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
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
// pipeline {
//   agent any
//   environment {
//     DOCKER_REGISTRY = 'soumyosish1'
//     BACKEND_IMAGE = "${DOCKER_REGISTRY}/homedine-backend:${BUILD_NUMBER}"
//     FRONTEND_IMAGE = "${DOCKER_REGISTRY}/homedine-frontend:${BUILD_NUMBER}"
//   }
//   stages {
//     stage('Checkout') {
//       steps {
//         checkout scm
//       }
//     }

//     stage('Build Backend') {
//       steps {
//         dir('backend') {
//           sh "docker build -t ${BACKEND_IMAGE} ."
//         }
//       }
//     }

//     stage('Build Frontend') {
//       steps {
//         dir('frontend') {
//           sh "docker build -t ${FRONTEND_IMAGE} ."
//         }
//       }
//     }

//     stage('Push to Docker Hub') {
//       steps {
//         withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
//           sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
//           sh "docker push ${BACKEND_IMAGE}"
//           sh "docker push ${FRONTEND_IMAGE}"
//           sh 'docker logout'
//         }
//       }
//     }

//     stage('Deploy to EC2') {
//       steps {
//         withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'EC2_KEY'), string(credentialsId: 'ec2-ip', variable: 'EC2_IP')]) {
//           sh """
//             chmod 600 ${EC2_KEY}
//             ssh -o StrictHostKeyChecking=no -i ${EC2_KEY} ubuntu@${EC2_IP} \\
//               'cd /home/ubuntu/HomeDine && docker pull ${BACKEND_IMAGE} && docker pull ${FRONTEND_IMAGE} && docker-compose down || true && docker-compose up -d --remove-orphans'
//           """
//         }
//       }
//     }
//   }

//   post {
//     always {
//       echo "Pipeline finished: ${currentBuild.currentResult}"
//     }
//   }
// }