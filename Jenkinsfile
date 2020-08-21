pipeline {
  agent any
  environment {

        EMAIL_BODY = 

        """

            <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>

            <p>

            View console output at 

            "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"

            </p> 

            <p><i>(Build log is attached.)</i></p>

        """

        EMAIL_SUBJECT_SUCCESS = "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

        EMAIL_SUBJECT_FAILURE = "Status: 'FAILURE' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

        EMAIL_RECEPIENT = 'noshkim78@gmail.com'

    }
    
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
  post {
        success {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'noshkim78@gmail.com'
        }
        failure {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: FAILURE -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'noshkim78@gmail.com'
        }
  }
}