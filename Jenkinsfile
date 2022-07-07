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
      // To rewrite organize files for backend
      steps {
        sh '''
          ls -lsa
          rm -rf /var/www/DeliveryBackend/*
          mv /var/lib/jenkins/workspace/DeliveryBackend/* /var/www/DeliveryBackend/
          rm -rf /var/lib/jenkins/workspace/DeliveryBackend/*
          ls -lsa
        '''
      }
    }


    stage("Move production Env") {
      steps {
        sh '''
          cp /var/www/temp/.env /var/www/DeliveryBackend/
        '''
      }
    }

    stage("Run the Backend") {
      steps {
        sh '''
          cd /var/www/DeliveryBackend
          pm2 start --name DeliveryBackend npm -- run start:prod
        '''
      }
    }
  }
}