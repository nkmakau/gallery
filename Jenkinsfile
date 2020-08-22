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
                body: EMAIL_BODY, 

                subject: EMAIL_SUBJECT_SUCCESS,

                to: EMAIL_RECEPIENT
        }

        failure {
            emailext attachLog: true, 
                body: EMAIL_BODY, 

                subject: EMAIL_SUBJECT_FAILURE, 

                to: EMAIL_RECEPIENT
        }
  }
}

def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
    summary = "${subject} :aaw_yeah: (${env.BUILD_URL})"
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
    summary = """
    :sunglasses:
    ```
      ${subject}\n\n
      View console output here\n
      ${env.BUILD_URL}\n
      Live Site Link:\n
      https://young-waters-07809.herokuapp.com/
      Repo Link:\n
      https://github.com/nkmakau/gallery
    ```
    :v:
    """
  } else {
    color = 'RED'
    colorCode = '#FF0000'
    summary = "${subject} :coffin_dance: (${env.BUILD_URL})"
  }

  // Send notifications
  slackSend (color: colorCode, message: summary)
}