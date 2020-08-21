pipeline {
  agent any
    
  tools {nodejs "Node-Build"}
    
  stages {
        
    stage('Git') {
      steps {
        echo 'Cloning...'
        git 'https://github.com/nkmakau/gallery'
      }
    }
     
    stage('Build') {
      steps {
        echo 'Building...'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing...'
        sh 'npm test'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying to Heroku...'
        withCredentials([usernameColonPassword(credentialsId: 'picha', variable: 'HEROKU_CREDENTIALS' )]){
            sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/young-waters-07809.git master'
        }
      }
    }
  }
}