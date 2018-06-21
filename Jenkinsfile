node {
    stage('Preparation') { // for display purposes
        git 'https://github.com/leskiw77/blog-project.git'
    }

    stage('check java') {
        sh "java -version"
    }

    stage('clean') {
        sh "chmod +x mvnw"
        sh "./mvnw clean"
    }

    stage('install tools') {
        sh "./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v8.9.4 -DnpmVersion=5.6.0"
    }

    stage('npm install') {
        sh "./mvnw com.github.eirslett:frontend-maven-plugin:npm"
    }

    stage('backend tests') {
        try {
            sh "./mvnw test"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/surefire-reports/TEST-*.xml'
        }
    }

    stage('deploy') {
        sh 'git remote add heroku https://git.heroku.com/pure-refuge-44567.git'
        sh 'git push heroku master'
    }
}
