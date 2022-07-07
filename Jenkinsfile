pipeline {
  agent any

  stages {

    stage('Install npm') {
      steps {
        sh '''
          npm install
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
          rm -rf /var/www/DeliveryBackend/*
          find . -mindepth 1 -maxdepth 1 -not -name 'build' -print0 | xargs -0 -r rm -rf 
          mv build/** /var/www/DeliveryBackend/
          ls -lsa
        '''
      }
    }
  }
}