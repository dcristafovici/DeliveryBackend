pipeline {
  agent any

  stages {

    stage('Install npm') {
      steps {
        sh '''
          npm install --force
        '''
      }
    }

    stage("Build") {
      steps {
        sh '''
          npm run build
        '''
      }
    }

    stage("Organize Files") {
      steps {
        sh '''
          ls -lsa
          mv /var/lib/jenkins/workspace/DeliveryBackend/* /var/www/DeliveryBackend/
          rm -rf /var/lib/jenkins/workspace/DeliveryBackend/*
          ls -lsa
        '''
      }
    }
  }
}