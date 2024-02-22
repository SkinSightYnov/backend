# pg_deploy.sh
echo "Starting PostgreSQL Kubernetes setup..."

echo "Creating namespace..."
kubectl create namespace db

echo "Creating ConfigMap..."
kubectl apply -f pg-configmap.yaml

echo "Creating deployment..."
kubectl apply -f pg-deployment.yaml

echo "Getting the deployment name..."
kubectl get deployments

echo "Exposing the deployment as a service..."
kubectl apply -f pg-service.yaml

echo "PostgreSQL Kubernetes setup completed."
