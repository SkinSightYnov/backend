# alertmanager_deploy.sh
echo "Starting Prometheus Alert Manager Kubernetes setup..."

echo "Creating configmap for the alertmanager configuration..."
kubectl apply -f alert-manager-configmap.yaml

echo "Creating configmap for the alertmanager templates..."
kubectl apply -f alert-template-configmap.yaml

echo "Deploying the alertmanager..."
kubectl apply -f alert-manager-deployment.yaml

echo "Deploying the alertmanager service..."
kubectl apply -f alert-manager-service.yaml

echo "Prometheus Alert Manager Kubernetes setup completed."
